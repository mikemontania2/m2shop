 // ============================================
// ProductoAdmin.controller.js
// Controlador exclusivo para administración de productos
// ============================================
const { Op } = require('sequelize'); 

const Producto = require('../models/Producto.models');
const Variante = require('../models/Variante.models');
const Atributo = require('../models/Atributo.models');
const ValorAtributo = require('../models/ValorAtributo.models');
const VarianteAtributo = require('../models/VarianteAtributo.models');
const Categoria = require('../models/Categoria.models');
const { sequelize } = require('../../dbconfig');

/**
 * Obtener todos los productos con sus variantes (para listado admin)
 */
const getAllProductos = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', categoriaId } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    
    if (search) { 
      whereClause.nombre={ [Op.iLike]: `%${search}%` } ;
    }
    
    if (categoriaId) {
      whereClause.categoriaId = categoriaId;
    }

    const { count, rows: productos } = await Producto.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Categoria,
          as: 'categoria'
        },
        {
          model: Categoria,
          as: 'subcategoria' 
        },
        {
          model: Variante,
          as: 'variantes' 
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['id', 'DESC']]
    });

    res.json({
      success: true,
      productos,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al obtener productos',
      details: error.message 
    });
  }
};

/**
 * Obtener un producto específico con todas sus relaciones
 */
const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id, {
      include: [
        {
          model: Categoria,
          as: 'categoria',
          attributes: ['id', 'nombre', 'slug']
        },
        {
          model: Categoria,
          as: 'subcategoria',
          attributes: ['id', 'nombre', 'slug']
        },
        {
          model: Variante,
          as: 'variantes',
          include: [
            {
              model: VarianteAtributo,
              as: 'atributos',
              include: [
                {
                  model: ValorAtributo,
                  as: 'valorAtributo',
                  include: [
                    {
                      model: Atributo,
                      as: 'atributo',
                      attributes: ['id', 'nombre', 'orden']
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    });

    if (!producto) {
      return res.status(404).json({ 
        success: false, 
        error: 'Producto no encontrado' 
      });
    }

    res.json({ success: true, producto });
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al obtener producto',
      details: error.message 
    });
  }
};

/**
 * Crear un nuevo producto
 */
const createProducto = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const {
      nombre,
      slug,
      descripcion,
      usosRecomendados,
      propiedades,
      categoriaId,
      subcategoriaId,
      activo = true
    } = req.body;

    // Validaciones
    if (!nombre || !slug || !categoriaId) {
      await transaction.rollback();
      return res.status(400).json({ 
        success: false, 
        error: 'Nombre, slug y categoría son obligatorios' 
      });
    }

    // Verificar que el slug sea único
    const existeSlug = await Producto.findOne({ where: { slug } });
    if (existeSlug) {
      await transaction.rollback();
      return res.status(400).json({ 
        success: false, 
        error: 'El slug ya existe' 
      });
    }

    // Crear producto
    const producto = await Producto.create({
      nombre,
      slug,
      descripcion,
      usosRecomendados,
      propiedades,
      categoriaId,
      subcategoriaId,
      activo
    }, { transaction });

    await transaction.commit();

    // Recargar con relaciones
    const productoCompleto = await Producto.findByPk(producto.id, {
      include: [
        { model: Categoria, as: 'categoria' },
        { model: Categoria, as: 'subcategoria' }
      ]
    });

    res.status(201).json({ 
      success: true, 
      mensaje: 'Producto creado exitosamente',
      producto: productoCompleto 
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error al crear producto:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al crear producto',
      details: error.message 
    });
  }
};

/**
 * Actualizar un producto existente
 */
const updateProducto = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const {
      nombre,
      slug,
      descripcion,
      usosRecomendados,
      propiedades,
      categoriaId,
      subcategoriaId,
      activo
    } = req.body;

    const producto = await Producto.findByPk(id);
    
    if (!producto) {
      await transaction.rollback();
      return res.status(404).json({ 
        success: false, 
        error: 'Producto no encontrado' 
      });
    }

    // Verificar slug único (si cambió)
    if (slug && slug !== producto.slug) {
      const existeSlug = await Producto.findOne({ 
        where: { 
          slug,
          id: { [require('sequelize').Op.ne]: id }
        } 
      });
      
      if (existeSlug) {
        await transaction.rollback();
        return res.status(400).json({ 
          success: false, 
          error: 'El slug ya existe' 
        });
      }
    }

    // Actualizar
    await producto.update({
      nombre: nombre || producto.nombre,
      slug: slug || producto.slug,
      descripcion,
      usosRecomendados,
      propiedades,
      categoriaId: categoriaId || producto.categoriaId,
      subcategoriaId,
      activo: activo !== undefined ? activo : producto.activo
    }, { transaction });

    await transaction.commit();

    // Recargar con relaciones
    const productoActualizado = await Producto.findByPk(id, {
      include: [
        { model: Categoria, as: 'categoria' },
        { model: Categoria, as: 'subcategoria' },
        { model: Variante, as: 'variantes' }
      ]
    });

    res.json({ 
      success: true, 
      mensaje: 'Producto actualizado exitosamente',
      producto: productoActualizado 
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al actualizar producto',
      details: error.message 
    });
  }
};

/**
 * Eliminar un producto (y sus variantes en cascada)
 */
const deleteProducto = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id);
    
    if (!producto) {
      await transaction.rollback();
      return res.status(404).json({ 
        success: false, 
        error: 'Producto no encontrado' 
      });
    }

    // Eliminar variantes asociadas primero
    await Variante.destroy({ 
      where: { productoId: id },
      transaction 
    });

    // Eliminar producto
    await producto.destroy({ transaction });

    await transaction.commit();

    res.json({ 
      success: true, 
      mensaje: 'Producto eliminado exitosamente' 
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al eliminar producto',
      details: error.message 
    });
  }
};

// ============================================
// GESTIÓN DE VARIANTES
// ============================================

/**
 * Crear una variante para un producto
 */
const createVariante = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const {
      productoId,
      sku,
      nombre,
      slug,
      precio,
      imagenUrl,
      images,
      stock = 0,
      destacado = false,
      nuevo = false,
      bloqueoDescuento = false,
      activo = true,
      atributos = [] // [{ valorAtributoId, orden }]
    } = req.body;

    // Validaciones
    if (!productoId || !sku || !nombre || !slug || !precio) {
      await transaction.rollback();
      return res.status(400).json({ 
        success: false, 
        error: 'Campos obligatorios: productoId, sku, nombre, slug, precio' 
      });
    }

    // Verificar que el producto existe
    const producto = await Producto.findByPk(productoId);
    if (!producto) {
      await transaction.rollback();
      return res.status(404).json({ 
        success: false, 
        error: 'Producto no encontrado' 
      });
    }

    // Verificar SKU único
    const existeSku = await Variante.findOne({ where: { sku } });
    if (existeSku) {
      await transaction.rollback();
      return res.status(400).json({ 
        success: false, 
        error: 'El SKU ya existe' 
      });
    }

    // Verificar slug único
    const existeSlug = await Variante.findOne({ where: { slug } });
    if (existeSlug) {
      await transaction.rollback();
      return res.status(400).json({ 
        success: false, 
        error: 'El slug ya existe' 
      });
    }

    // Crear variante
    const variante = await Variante.create({
      productoId,
      sku,
      nombre,
      slug,
      precio,
      imagenUrl,
      images,
      stock,
      destacado,
      nuevo,
      bloqueoDescuento,
      activo
    }, { transaction });

    // Asociar atributos si existen
    if (atributos && atributos.length > 0) {
      const atributosData = atributos.map(attr => ({
        varianteId: variante.id,
        valorAtributoId: attr.valorAtributoId,
        orden: attr.orden || 0
      }));

      await VarianteAtributo.bulkCreate(atributosData, { transaction });
    }

    await transaction.commit();

    // Recargar con relaciones
    const varianteCompleta = await Variante.findByPk(variante.id, {
      include: [
        {
          model: Producto,
          as: 'producto',
          attributes: ['id', 'nombre']
        },
        {
          model: VarianteAtributo,
          as: 'atributos',
          include: [
            {
              model: ValorAtributo,
              as: 'valorAtributo',
              include: [
                {
                  model: Atributo,
                  as: 'atributo'
                }
              ]
            }
          ]
        }
      ]
    });

    res.status(201).json({ 
      success: true, 
      mensaje: 'Variante creada exitosamente',
      variante: varianteCompleta 
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error al crear variante:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al crear variante',
      details: error.message 
    });
  }
};

/**
 * Actualizar una variante existente
 */
const updateVariante = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const {
      sku,
      nombre,
      slug,
      precio,
      imagenUrl,
      images,
      stock,
      destacado,
      nuevo,
      bloqueoDescuento,
      activo,
      atributos // [{ valorAtributoId, orden }]
    } = req.body;

    const variante = await Variante.findByPk(id);
    
    if (!variante) {
      await transaction.rollback();
      return res.status(404).json({ 
        success: false, 
        error: 'Variante no encontrada' 
      });
    }

    // Verificar SKU único (si cambió)
    if (sku && sku !== variante.sku) {
      const existeSku = await Variante.findOne({ 
        where: { 
          sku,
          id: { [require('sequelize').Op.ne]: id }
        } 
      });
      
      if (existeSku) {
        await transaction.rollback();
        return res.status(400).json({ 
          success: false, 
          error: 'El SKU ya existe' 
        });
      }
    }

    // Verificar slug único (si cambió)
    if (slug && slug !== variante.slug) {
      const existeSlug = await Variante.findOne({ 
        where: { 
          slug,
          id: { [require('sequelize').Op.ne]: id }
        } 
      });
      
      if (existeSlug) {
        await transaction.rollback();
        return res.status(400).json({ 
          success: false, 
          error: 'El slug ya existe' 
        });
      }
    }

    // Actualizar variante
    await variante.update({
      sku: sku || variante.sku,
      nombre: nombre || variante.nombre,
      slug: slug || variante.slug,
      precio: precio !== undefined ? precio : variante.precio,
      imagenUrl,
      images,
      stock: stock !== undefined ? stock : variante.stock,
      destacado: destacado !== undefined ? destacado : variante.destacado,
      nuevo: nuevo !== undefined ? nuevo : variante.nuevo,
      bloqueoDescuento: bloqueoDescuento !== undefined ? bloqueoDescuento : variante.bloqueoDescuento,
      activo: activo !== undefined ? activo : variante.activo
    }, { transaction });

    // Actualizar atributos si se proporcionaron
    if (atributos !== undefined) {
      // Eliminar atributos existentes
      await VarianteAtributo.destroy({ 
        where: { varianteId: id },
        transaction 
      });

      // Crear nuevos atributos
      if (atributos.length > 0) {
        const atributosData = atributos.map(attr => ({
          varianteId: id,
          valorAtributoId: attr.valorAtributoId,
          orden: attr.orden || 0
        }));

        await VarianteAtributo.bulkCreate(atributosData, { transaction });
      }
    }

    await transaction.commit();

    // Recargar con relaciones
    const varianteActualizada = await Variante.findByPk(id, {
      include: [
        {
          model: Producto,
          as: 'producto'
        },
        {
          model: VarianteAtributo,
          as: 'atributos',
          include: [
            {
              model: ValorAtributo,
              as: 'valorAtributo',
              include: [
                {
                  model: Atributo,
                  as: 'atributo'
                }
              ]
            }
          ]
        }
      ]
    });

    res.json({ 
      success: true, 
      mensaje: 'Variante actualizada exitosamente',
      variante: varianteActualizada 
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error al actualizar variante:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al actualizar variante',
      details: error.message 
    });
  }
};

/**
 * Eliminar una variante
 */
const deleteVariante = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;

    const variante = await Variante.findByPk(id);
    
    if (!variante) {
      await transaction.rollback();
      return res.status(404).json({ 
        success: false, 
        error: 'Variante no encontrada' 
      });
    }

    // Eliminar atributos asociados
    await VarianteAtributo.destroy({ 
      where: { varianteId: id },
      transaction 
    });

    // Eliminar variante
    await variante.destroy({ transaction });

    await transaction.commit();

    res.json({ 
      success: true, 
      mensaje: 'Variante eliminada exitosamente' 
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error al eliminar variante:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al eliminar variante',
      details: error.message 
    });
  }
};

// ============================================
// GESTIÓN DE ATRIBUTOS
// ============================================

/**
 * Obtener todos los atributos con sus valores
 */
const getAllAtributos = async (req, res) => {
  try {
    const atributos = await Atributo.findAll({
      include: [
        {
          model: ValorAtributo,
          as: 'valores',
          where: { activo: true },
          required: false
        }
      ],
      where: { activo: true },
      order: [
        ['orden', 'ASC'],
        ['nombre', 'ASC'],
        [{ model: ValorAtributo, as: 'valores' }, 'valor', 'ASC']
      ]
    });

    res.json({ success: true, atributos });
  } catch (error) {
    console.error('Error al obtener atributos:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al obtener atributos',
      details: error.message 
    });
  }
};

/**
 * Crear un nuevo atributo
 */
const createAtributo = async (req, res) => {
  try {
    const { nombre, orden = 0, activo = true } = req.body;

    if (!nombre) {
      return res.status(400).json({ 
        success: false, 
        error: 'El nombre es obligatorio' 
      });
    }

    const atributo = await Atributo.create({ nombre, orden, activo });

    res.status(201).json({ 
      success: true, 
      mensaje: 'Atributo creado exitosamente',
      atributo 
    });
  } catch (error) {
    console.error('Error al crear atributo:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al crear atributo',
      details: error.message 
    });
  }
};

/**
 * Crear un valor para un atributo
 */
const createValorAtributo = async (req, res) => {
  try {
    const { atributoId, valor, propiedades, activo = true } = req.body;

    if (!atributoId || !valor) {
      return res.status(400).json({ 
        success: false, 
        error: 'atributoId y valor son obligatorios' 
      });
    }

    // Verificar que el atributo existe
    const atributo = await Atributo.findByPk(atributoId);
    if (!atributo) {
      return res.status(404).json({ 
        success: false, 
        error: 'Atributo no encontrado' 
      });
    }

    const valorAtributo = await ValorAtributo.create({
      atributoId,
      valor,
      propiedades,
      activo
    });

    // Recargar con relaciones
    const valorCompleto = await ValorAtributo.findByPk(valorAtributo.id, {
      include: [
        {
          model: Atributo,
          as: 'atributo'
        }
      ]
    });

    res.status(201).json({ 
      success: true, 
      mensaje: 'Valor de atributo creado exitosamente',
      valorAtributo: valorCompleto 
    });
  } catch (error) {
    console.error('Error al crear valor de atributo:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al crear valor de atributo',
      details: error.message 
    });
  }
};

module.exports = {
  // Productos
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  
  // Variantes
  createVariante,
  updateVariante,
  deleteVariante,
  
  // Atributos
  getAllAtributos,
  createAtributo,
  createValorAtributo
};