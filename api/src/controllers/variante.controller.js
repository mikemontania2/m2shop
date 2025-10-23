const { Op } = require("sequelize");
const Variante = require("../models/Variante.models");
const Producto = require("../models/Producto.models");
const Categoria = require("../models/Categoria.models");
const Descuento = require("../models/Descuento.models");
const moment = require('moment');

/**
 * Obtener descuentos vigentes
 */
const getDescuentosVigentes = async (variantesIds) => {
  const hoy = moment().format('YYYY-MM-DD');
  
  const descuentos = await Descuento.findAll({
    where: {
      varianteId: { [Op.in]: variantesIds },
      activo: true,
      fechaDesde: { [Op.lte]: hoy },
      fechaHasta: { [Op.gte]: hoy }
    },
    attributes: ['varianteId', 'valor', 'tipo'],
    raw: true
  });

  return new Map(descuentos.map(d => [d.varianteId, d]));
};

/**
 * Aplicar descuento
 */
const aplicarDescuento = (precio, precioOriginal, descuento) => {
  let finalPrice = parseFloat(precio);
  let originalPrice = parseFloat(precioOriginal) || 0;

  if (descuento) {
    if (!originalPrice) {
      originalPrice = finalPrice;
    }

    if (descuento.tipo === 'IMPORTE') {
      finalPrice = Math.max(0, finalPrice - parseFloat(descuento.valor));
    } else if (descuento.tipo === 'PRODUCTO') {
      finalPrice = finalPrice * (1 - parseFloat(descuento.valor) / 100);
    }
  }

  return {
    price: Math.round(finalPrice),
    originalPrice: Math.round(originalPrice)
  };
};

/**
 * Transformar a formato ProductCard
 */
const transformarAProductCard = (variantes, descuentosMap) => {
  return variantes.map(v => {
    const descuento = descuentosMap.get(v.id);
    const { price, originalPrice } = aplicarDescuento(
      v.precio,
      v.precioOriginal,
      descuento
    );

    return {
      id: v.id,
      name: v.nombre,
      slug: v.slug,
      image: v.imagenUrl,
      price,
      originalPrice,
      stock: v.stock
    };
  });
};

/**
 * GET /api/home/destacados
 */
const getDestacados = async (req, res) => {
  try {
    const limit = 12;

    const variantes = await Variante.findAll({
      where: { 
        activo: true,
        destacado: true
      },
      attributes: ['id', 'nombre', 'slug', 'precio', 'precioOriginal', 'imagenUrl', 'stock'],
      order: [['created_at', 'DESC']],
      limit,
      raw: true
    });

    const variantesIds = variantes.map(v => v.id);
    const descuentosMap = await getDescuentosVigentes(variantesIds);
    const productos = transformarAProductCard(variantes, descuentosMap);

    res.json({
      success: true,
      productos,
      count: productos.length
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
 * GET /api/home/novedades
 */
const getNovedades = async (req, res) => {
  try {
    const limit = 12;

    const variantes = await Variante.findAll({
      where: { 
        activo: true
      },
      attributes: ['id', 'nombre', 'slug', 'precio', 'precioOriginal', 'imagenUrl', 'stock'],
      order: [['created_at', 'DESC']],
      limit,
      raw: true
    });

    const variantesIds = variantes.map(v => v.id);
    const descuentosMap = await getDescuentosVigentes(variantesIds);
    const productos = transformarAProductCard(variantes, descuentosMap);

    res.json({
      success: true,
      productos,
      count: productos.length
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

/**
 * GET /api/home/categoria/:slug
 */
const getByCategoria = async (req, res) => {
  try {
    const { slug } = req.params;
    const limit = 12;

    const categoria = await Categoria.findOne({
      where: { slug, activo: true },
      attributes: ['id', 'nombre', 'slug'],
      raw: true
    });

    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    const variantes = await Variante.findAll({
      where: { activo: true },
      attributes: ['id', 'nombre', 'slug', 'precio', 'precioOriginal', 'imagenUrl', 'stock'],
      include: [{
        model: Producto,
        as: 'producto',
        where: { 
          activo: true,
          categoriaId: categoria.id
        },
        attributes: [],
        required: true
      }],
      order: [['created_at', 'DESC']],
      limit,
      raw: true
    });

    const variantesIds = variantes.map(v => v.id);
    const descuentosMap = await getDescuentosVigentes(variantesIds);
    const productos = transformarAProductCard(variantes, descuentosMap);

    res.json({
      success: true,
      categoria,
      productos,
      count: productos.length
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

module.exports = {
  getDestacados,
  getNovedades,
  getByCategoria
};