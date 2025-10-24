const { Op } = require("sequelize");
const Variante = require("../models/Variante.models");
const Producto = require("../models/Producto.models");
const Categoria = require("../models/Categoria.models");
const Descuento = require("../models/Descuento.models");
const moment = require('moment');
const { aplicarDescuento } = require("../helper/productos.helper");

/**
 * Obtener descuentos vigentes
 */
const getDescuentosVigentes = async (variantesIds) => {
  const hoy = moment().format('YYYY-MM-DD');
  
  const descuentos = await Descuento.findAll({
    where: {
      varianteId: { [Op.in]: variantesIds },
      activo: true,
      tipo:'PRODUCTO',
      fechaDesde: { [Op.lte]: hoy },
      fechaHasta: { [Op.gte]: hoy }
    },
    attributes: ['varianteId', 'valor', 'tipo'],
    raw: true
  });

  return new Map(descuentos.map(d => [d.varianteId, d]));
};
 
/**
 * Transformar a formato ProductCard
 */
const transformarAProductCard = (variantes, descuentosMap) => {
  return variantes.map(v => {
    const descuento = descuentosMap.get(v.id);
    const { price, originalPrice } = aplicarDescuento(
      v.precio,
      0,
      descuento
    );

    return {
      id: v.id,
      name: v.nombre,
      slug: v.slug,
      image: v.imagenUrl,
      price,
      featured:v.destacado,
      news:v.nuevo,
      originalPrice,
      stock: v.stock
    };
  });
};

/**
 * GET /api/home/destacados?page=1&limit=12
 */
const getDestacados = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    const { count, rows } = await Variante.findAndCountAll({
      where: { 
        activo: true,
        destacado: true
      },
      attributes: ['id', 'nombre', 'slug', 'precio', 'precioOriginal', 'imagenUrl', 'stock', 'destacado', 'nuevo'],
      order: [['created_at', 'DESC']],
      limit,
      offset,
      raw: true
    });

    const variantesIds = rows.map(v => v.id);
    const descuentosMap = await getDescuentosVigentes(variantesIds);
    const productos = transformarAProductCard(rows, descuentosMap);

    res.json({
      success: true,
      productos,
      pagination: {
        total: count,
        pages: Math.ceil(count / limit),
        current: page,
        limit
      }
    });
  } catch (error) {
    console.error('Error al obtener destacados:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos destacados',
      error: error.message
    });
  }
};
 

 
/**
 * GET /api/home/categoria/:slug?page=1&limit=12
 */
const getByCategoria = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    // Traer la categoría o subcategoría por slug
    const categoria = await Categoria.findOne({
      where: { slug, activo: true },
      attributes: ['id', 'nombre', 'slug', 'categoriasPadreId'],
      raw: true
    });

    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    // Determinar si es categoría o subcategoría
    const esSubcategoria = categoria.categoriasPadreId !== null;

    const whereProducto = { activo: true };
    if (esSubcategoria) {
      whereProducto.subcategoriaId = categoria.id;
    } else {
      whereProducto.categoriaId = categoria.id;
    }

    const { count, rows } = await Variante.findAndCountAll({
      where: { activo: true },
      attributes: ['id', 'nombre', 'slug', 'precio', 'precioOriginal', 'imagenUrl', 'stock', 'destacado', 'nuevo'],
      include: [{
        model: Producto,
        as: 'producto',
        where: whereProducto,
        attributes: [],
        required: true
      }],
      order: [['created_at', 'DESC']],
      limit,
      offset,
      raw: true
    });

    const variantesIds = rows.map(v => v.id);
    const descuentosMap = await getDescuentosVigentes(variantesIds);
    const productos = transformarAProductCard(rows, descuentosMap);

    res.json({
      success: true,
      categoria,
      productos,
      pagination: {
        total: count,
        pages: Math.ceil(count / limit),
        current: page,
        limit
      }
    });

  } catch (error) {
    console.error('Error al obtener productos por categoría:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos',
      error: error.message
    });
  }
};
/**
 * GET /api/home/novedades?page=1&limit=12
 */
const getNovedades = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    const { count, rows } = await Variante.findAndCountAll({
      where: { activo: true, nuevo:true },
      attributes: ['id', 'nombre', 'slug', 'precio', 'precioOriginal', 'imagenUrl', 'stock', 'destacado', 'nuevo'],
      order: [['created_at', 'DESC']],
      limit,
      offset,
      raw: true
    });

    const variantesIds = rows.map(v => v.id);
    const descuentosMap = await getDescuentosVigentes(variantesIds);
    const productos = transformarAProductCard(rows, descuentosMap);

    res.json({
      success: true,
      productos,
      pagination: {
        total: count,
        pages: Math.ceil(count / limit),
        current: page,
        limit
      }
    });
  } catch (error) {
    console.error('Error al obtener novedades:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener novedades',
      error: error.message
    });
  }
};
const buscarProductos = async (req, res) => {
  try {
    const query = req.query.q?.trim() || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit; 

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Debe proporcionar un término de búsqueda (q)',
      });
    }

    // ✅ Construir condiciones de búsqueda válidas
    const searchCondition = {
      [Op.or]: [
        // Campos de Variante
        { nombre: { [Op.iLike]: `%${query}%` } },

        // Campos del Producto
       /*  { '$producto.nombre$': { [Op.iLike]: `%${query}%` } },
        { '$producto.descripcion$': { [Op.iLike]: `%${query}%` } },
        { '$producto.propiedades$': { [Op.iLike]: `%${query}%` } },
        { '$producto.usosRecomendados$': { [Op.iLike]: `%${query}%` } }, */

        // Campos de categoría y subcategoría
      /*   { '$producto.categoria.nombre$': { [Op.iLike]: `%${query}%` } },
        { '$producto.subcategoria.nombre$': { [Op.iLike]: `%${query}%` } }, */
      ],
    };

    const { count, rows } = await Variante.findAndCountAll({
      where: {
        activo: true,
        ...searchCondition
      },
      attributes: [
        'id',
        'nombre',
        'slug',
        'precio',
        'precioOriginal',
        'imagenUrl',
        'stock',
        'destacado',
        'nuevo'
      ],
      include: [
        {
          model: Producto,
          as: 'producto',
          attributes: ['id', 'nombre', 'descripcion', 'propiedades', 'usosRecomendados'],
          include: [
            { model: Categoria, as: 'categoria', attributes: ['id', 'nombre', 'slug'] },
            { model: Categoria, as: 'subcategoria', attributes: ['id', 'nombre', 'slug'] }
          ]
        }
      ],
      order: [['created_at', 'DESC']],
      limit,
      offset, 
    });

    // 🔹 Obtener descuentos y transformar resultados
    const variantesIds = rows.map(v => v.id);
    const descuentosMap = await getDescuentosVigentes(variantesIds);
    const productos = transformarAProductCard(rows, descuentosMap);

    res.json({
      success: true,
      query,
      productos,
      pagination: {
        total: count,
        pages: Math.ceil(count / limit),
        current: page,
        limit
      }
    });

  } catch (error) {
    console.error('Error al buscar productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al buscar productos',
      error: error.message
    });
  }
};


module.exports = {
  getDestacados,
  getNovedades,
  getByCategoria,buscarProductos
};