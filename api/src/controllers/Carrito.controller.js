const { Op } = require('sequelize')
const Carrito = require('../models/Carrito.models')
const ItemCarrito = require('../models/ItemCarrito.models')
const Producto = require('../models/Producto.models')
const Variante = require('../models/Variante.models')
const Descuento = require('../models/Descuento.models')
const Categoria = require('../models/Categoria.models')
const moment = require('moment')
const { aplicarDescuento } = require('../helper/productos.helper')

// ========================================
// FUNCIONES AUXILIARES
// ========================================

/**
 * Obtener descuentos de productos vigentes
 */
const getDescuentosProductosVigentes = async variantesIds => {
  const hoy = moment().format('YYYY-MM-DD')

  const descuentos = await Descuento.findAll({
    where: {
      varianteId: { [Op.in]: variantesIds },
      activo: true,
      tipo: 'PRODUCTO',
      fechaDesde: { [Op.lte]: hoy },
      fechaHasta: { [Op.gte]: hoy }
    },
    attributes: ['varianteId', 'valor', 'tipo'],
    raw: true
  })

  return new Map(descuentos.map(d => [d.varianteId, d]))
}

/**
 * Obtener descuento de IMPORTE vigenteo null
 * (Descuentos que se aplican según el monto total de la compra)
 */
const getDescuentoImporteVigente = async subtotal => {
  const hoy = moment().format('YYYY-MM-DD')

  const descuento = await Descuento.findOne({
    where: {
      activo: true,
      tipo: 'IMPORTE',
      cantDesde: { [Op.lte]: subtotal }, // menor o igual que subtotal
      cantHasta: { [Op.gte]: subtotal }, // mayor o igual que subtotal
      fechaDesde: { [Op.lte]: hoy },
      fechaHasta: { [Op.gte]: hoy }
    },
    attributes: ['id', 'cantDesde', 'cantHasta', 'valor', 'tipo'],
    order: [['valor', 'DESC']], // el mayor valor primero
    raw: true
  })

  return descuento // retorna solo un registro o null si no hay vigente
}

/**
 * Calcular el mejor descuento por importe aplicable
 */
const calcularDescuentoImporte = (subtotal, descuentosImporte) => {
  if (!descuentosImporte || descuentosImporte.length === 0) {
    return { descuento: 0, descuentoAplicado: null }
  }

  // Encontrar el descuento aplicable con mayor beneficio
  for (const desc of descuentosImporte) {
    if (subtotal >= (desc.montoMinimo || 0)) {
      const descuento =
        desc.tipoDescuento === 'PORCENTAJE'
          ? (subtotal * desc.valor) / 100
          : desc.valor

      return {
        descuento,
        descuentoAplicado: {
          id: desc.id,
          nombre: desc.nombre,
          tipo: desc.tipoDescuento,
          valor: desc.valor
        }
      }
    }
  }

  return { descuento: 0, descuentoAplicado: null }
}
/**
 * Formatea números con puntos de miles (por ejemplo, 6550 → 6.550)
 */
const formatGs = value => {
  if (isNaN(value)) return String(value)
  const rounded = Math.round(value)
  // Usar formato con puntos manualmente
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

/**
 * Aplica descuento por importe sobre las líneas marcadas como elegibles.
 */
const aplicarDescuentoImporte = (lineas, descuentoImporte) => {
  const porcentaje_descuento = descuentoImporte ? +descuentoImporte.valor : 0;

  // Si no hay descuento, devolvemos las líneas tal cual
  if (porcentaje_descuento <= 0) return lineas;

  return lineas.map(linea => {
    if (linea.tipoDescuento !== 'PRODUCTO' && !linea.bloqueoDescuento) {
      linea.descuento = porcentaje_descuento;
       linea.tipoDescuento ='IMPORTE';
      linea.importeDescuento = linea.subtotal * (linea.descuento / 100);
      linea.total = linea.total - linea.importeDescuento;
      linea.descripcion = `Por importe (${linea.descuento}%) - ${formatGs( linea.importeDescuento )} Gs`;
    }
    return linea;
  });
};

/**
 * Transformar items del carrito a formato ProductCard
 */
const transformarItemsCarrito = async items => {
  if (!items || items.length === 0) return []

  const variantesIds = items.map(item => item.varianteId).filter(id => id)
  const descuentosMap = await getDescuentosProductosVigentes(variantesIds)

  return items.map(item => {
    const variante = item.Variante
    const producto = item.Producto 
    descuentoObjeto= variante ? descuentosMap.get(variante.id) : null;
    console.log(descuentoObjeto);
    // Aplicar descuento si existe
    const descuento = (descuentoObjeto)? +descuentoObjeto.valor:0;
    const tipo = descuento > 0 ? 'PRODUCTO' : ''
    const subtotal = item.cantidad * variante.precio
    const importeDescuento = descuento > 0 ? (subtotal * descuento) / 100 : 0
    const total = subtotal - importeDescuento
    const descripcion =
      descuento > 0
        ? `Por producto (${+descuento}%) - ${formatGs(+importeDescuento)} Gs`
        : ''

    return {
      id: item.id,
      itemCarritoId: item.id,
      varianteId: item.varianteId,
      productoId: item.productoId,
      nombre: variante ? variante.nombre : producto.nombre,
      slug: variante ? variante.slug : producto.slug,
      imagen: variante ? variante.imagenUrl : '',
      precio: +variante.precio,
      cantidad: item.cantidad,
      subtotal,
      total,
      descuento,
      bloqueoDescuento: variante.bloqueoDescuento,
      importeDescuento,
      descripcion,
      tipoDescuento: tipo,
      stock: variante ? variante.stock : producto.stock
    }
  })
}

// ========================================
// CONTROLADORES
// ========================================

/**
 * @route GET /api/carrito
 * @desc Obtener carrito con recálculo automático
 * @access Private/Session
 */
const obtenerCarrito = async (req, res) => {
  try {
    const usuarioId = req.usuario?.id
    const sessionId = req.sessionId
    console.log(req.usuario)
    console.log(req.sessionId)
    const where = usuarioId ? { usuarioId } : { sessionId }

    let carrito = await Carrito.findOne({ where })
    console.log(carrito)
    if (!carrito) {
      carrito = await Carrito.create(where)
      return res.json({
        carrito: { id: carrito.id, items: [] },
        resumen: {
          subtotal: 0,
          descuentoImporte: 0,
          total: 0,
          cantidadItems: 0
        },
        descuentoAplicado: null
      })
    }

    // ⚠️ Obtener los items usando ItemCarrito.findAll
   const itemsCarrito = await ItemCarrito.findAll({
  where: { carritoId: carrito.id },
  include: [
    {
      model: Variante,
      attributes: [
        'id',
        'nombre',
        'slug',
        'precio',
        'imagenUrl',
        'bloqueoDescuento'
      ],
      where: { activo: true }, // ✅ Solo variantes activas
      required: true // ✅ Hace INNER JOIN (excluye las inactivas)
    }
  ]
});

// transformarItemsCarrito tambien creara las lineas de descuento producto aplicado
    const items = await transformarItemsCarrito(itemsCarrito)
    // sub total descontable es la suma sin las variantes con bloqueoDescuento y descuento producto... para obtener el porcentaje descuento importe
    const valorDescontable = items
      .filter(
        item => item.tipoDescuento !== 'PRODUCTO' && !item.bloqueoDescuento
      )
      .reduce((sum, item) => sum + item.subtotal, 0)
    console.log('****Importe descontable es**** =>',valorDescontable)
    // Obtener descuento importe  vigente objeto o null
    const descuentoImporte = await getDescuentoImporteVigente( valorDescontable ); 
     console.log('****Importe descuentoImporte es**** =>',descuentoImporte)
    const detalles = await aplicarDescuentoImporte(      items,      descuentoImporte    )
    const importeDescuento = detalles.reduce(  (sum, item) => sum + item.importeDescuento, 0 )
    const subTotal = detalles.reduce(   (sum, item) => sum + item.subtotal,  0  )
    const total = detalles.reduce( (sum, item) => sum + item.total, 0  )

    res.json({
      carrito: { id: carrito.id, items: detalles },
      resumen: {
        subTotal,
        importeDescuento,
        total: Math.max(total, 0),
        cantidadItems: detalles.length
      }
    })
  } catch (error) {
    console.error('Error obteniendo carrito:', error)
    res
      .status(500)
      .json({ error: 'Error al obtener carrito', detalle: error.message })
  }
}

/**
 * @route POST /api/carrito/agregar
 * @desc Agregar item al carrito
 * @access Private/Session
 */
const agregarItem = async (req, res) => {
  try {
    console.log(req.body)
    const { varianteId, cantidad = 1 } = req.body
    const usuarioId = req.usuario?.id
    const sessionId = req.sessionId

    if (!varianteId) {
      return res.status(400).json({ error: 'varianteId es requerido' })
    }

    // Verificar que la variante existe
    const variante = await Variante.findByPk(varianteId, {
      include: [
        {
          model: Producto,
          as: 'producto',
          attributes: ['id', 'nombre']
        }
      ]
    })

    if (!variante) {
      return res.status(404).json({ error: 'Variante no encontrada' })
    }

    if (!variante.activo) {
      return res.status(400).json({ error: 'Producto no disponible' })
    }

    // Obtener o crear carrito
    const where = usuarioId ? { usuarioId } : { sessionId }
    let carrito = await Carrito.findOne({ where })

    if (!carrito) {
      carrito = await Carrito.create(where)
    }

    // Verificar si el item ya existe
    const itemExistente = await ItemCarrito.findOne({
      where: { carritoId: carrito.id, varianteId }
    })

    if (itemExistente) {
      const nuevaCantidad = itemExistente.cantidad + cantidad
      await itemExistente.update({ cantidad: nuevaCantidad })
    } else {
      await ItemCarrito.create({
        carritoId: carrito.id,
        productoId: variante.productoId,
        varianteId: variante.id,
        cantidad,
        precioUnitario: variante.precio
      })
    }

    // Obtener items del carrito directamente
    const itemsRaw = await ItemCarrito.findAll({
      where: { carritoId: carrito.id },
      include: [
        { model: Producto, attributes: ['id', 'nombre'] },
        { model: Variante, attributes: ['id', 'nombre', 'precio'] }
      ]
    })

    const items = await transformarItemsCarrito(itemsRaw)
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0)

    res.json({
      mensaje: 'Producto agregado al carrito',
      carrito: {
        id: carrito.id,
        items
      },
      resumen: {
        subtotal,
        cantidadItems: items.length
      }
    })
  } catch (error) {
    console.error('Error agregando item:', error)
    res.status(500).json({
      error: 'Error al agregar item',
      detalle: error.message
    })
  }
}

/**
 * @route PUT /api/carrito/item/:itemId
 * @desc Actualizar cantidad de un item
 * @access Private/Session
 */
const actualizarCantidad = async (req, res) => {
  try {
    const { itemId } = req.params
    const { cantidad } = req.body

    if (!cantidad || cantidad < 1) {
      return res.status(400).json({ error: 'Cantidad debe ser mayor a 0' })
    }

    const item = await ItemCarrito.findByPk(itemId, {
      include: [Variante]
    })

    if (!item) {
      return res.status(404).json({ error: 'Item no encontrado' })
    }

    await item.update({ cantidad })

    res.json({
      mensaje: 'Cantidad actualizada',
      item: {
        id: item.id,
        cantidad: item.cantidad
      }
    })
  } catch (error) {
    console.error('Error actualizando cantidad:', error)
    res.status(500).json({
      error: 'Error al actualizar cantidad',
      detalle: error.message
    })
  }
}

/**
 * @route DELETE /api/carrito/item/:itemId
 * @desc Eliminar item del carrito
 * @access Private/Session
 */
const eliminarItem = async (req, res) => {
  try {
    const { itemId } = req.params

    const deleted = await ItemCarrito.destroy({
      where: { id: itemId }
    })

    if (!deleted) {
      return res.status(404).json({ error: 'Item no encontrado' })
    }

    res.json({ mensaje: 'Item eliminado del carrito' })
  } catch (error) {
    console.error('Error eliminando item:', error)
    res.status(500).json({
      error: 'Error al eliminar item',
      detalle: error.message
    })
  }
}

/**
 * @route POST /api/carrito/vaciar
 * @desc Vaciar carrito completo
 * @access Private/Session
 */
const vaciarCarrito = async (req, res) => {
  try {
    const usuarioId = req.usuario?.id
    const sessionId = req.sessionId

    const where = usuarioId ? { usuarioId } : { sessionId }
    const carrito = await Carrito.findOne({ where })

    if (carrito) {
      await ItemCarrito.destroy({
        where: { carritoId: carrito.id }
      })
    }

    res.json({ mensaje: 'Carrito vaciado exitosamente' })
  } catch (error) {
    console.error('Error vaciando carrito:', error)
    res.status(500).json({
      error: 'Error al vaciar carrito',
      detalle: error.message
    })
  }
}

/**
 * @route POST /api/carrito/recalcular
 * @desc Recalcular precios y descuentos del carrito
 * @access Private/Session
 */
const recalcularCarrito = async (req, res) => {
  return obtenerCarrito(req, res);
};

 

module.exports = {
  obtenerCarrito,
  agregarItem,
  actualizarCantidad,
  eliminarItem,
  vaciarCarrito,
  recalcularCarrito 
}
