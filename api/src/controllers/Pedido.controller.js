// ========================================
// Pedido.controller.js - Controlador de Pedidos
// ========================================

const { Op } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const Pedido = require('../models/Pedido.models');
const ItemPedido = require('../models/ItemPedido.models');
const DireccionEnvio = require('../models/DireccionEnvio.models');
const Carrito = require('../models/Carrito.models');
const ItemCarrito = require('../models/ItemCarrito.models');
const Variante = require('../models/Variante.models');
const Producto = require('../models/Producto.models');
const Usuario = require('../models/Usuario.models');
const moment = require('moment');

// ========================================
// FUNCIONES AUXILIARES
// ========================================

/**
 * Generar número de pedido único
 */
const generarNumeroPedido = () => {
  const fecha = moment().format('YYYYMMDD');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `PED-${fecha}-${random}`;
};

/**
 * Crear dirección de envío desde datos del checkout
 */
const crearDireccionEnvio = async (datosCliente, usuarioId) => {
  try {
    const direccion = await DireccionEnvio.create({
      usuarioId: usuarioId,
      calle: datosCliente.direccion || 'No especificado',
      numero: '',
      nombreCompleto:datosCliente.nombre,
      telefono:datosCliente.telefono,
      departamento: '',
      ciudad: '',
      barrio: '',
      transversal: '',
      referencia: datosCliente.notas || '',
      lat: 0,
      lng: 0
    });
    
    return direccion.id;
  } catch (error) {
    console.error('Error creando dirección:', error);
    throw new Error('Error al crear dirección de envío');
  }
};

/**
 * Obtener items del carrito con cálculos
 */
const obtenerItemsCarrito = async (carritoId) => {
  const itemsCarrito = await ItemCarrito.findAll({
    where: { carritoId },
    include: [
      {
        model: Variante,
        attributes: ['id', 'nombre', 'precio', 'imagenUrl', 'sku', 'bloqueoDescuento'],
        where: { activo: true },
        required: true,
        include: [{
          model: Producto,
          as: 'producto',
          attributes: ['id', 'nombre']
        }]
      }
    ]
  });

  return itemsCarrito.map(item => {
    const variante = item.Variante;
    const subtotal = item.cantidad * variante.precio;
    
    return {
      productoId: variante.producto.id,
      varianteId: variante.id,
      nombreProducto: variante.nombre,
      sku: variante.sku,
      imagenUrl: variante.imagenUrl,
      cantidad: item.cantidad,
      precioUnitario: variante.precio,
      descuento: 0, // TODO: Aplicar lógica de descuentos
      importeDescuento: 0,
      subtotal: subtotal,
      total: subtotal
    };
  });
};

// ========================================
// CONTROLADORES
// ========================================

/**
 * @route POST /api/pedidos/crear
 * @desc Crear pedido desde checkout (invitado o autenticado)
 * @access Private/Session
 */
const crearPedido = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const {
      cliente,
      items,
      total,
      metodoPago,
      shippingCost = 0,
      notasCliente = ''
    } = req.body;

    const usuarioId = req.usuario?.id;
    const sessionId = req.sessionId;

    // Validaciones básicas
    if (!cliente || !items || items.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ 
        error: 'Datos incompletos: se requiere información del cliente e items' 
      });
    }

    if (!metodoPago) {
      await transaction.rollback();
      return res.status(400).json({ error: 'Método de pago requerido' });
    }

    // 1. Obtener o crear usuario
    let finalUsuarioId = usuarioId;
    
    if (!usuarioId) {
      // Crear usuario invitado o buscar existente por email
      let usuario = await Usuario.findOne({
        where: { email: cliente.email }
      });
console.log(cliente)
      if (!usuario) {
        usuario = await Usuario.create({
          email: cliente.email,
          nombre: cliente.nombre,
          telefono: cliente.telefono || '',
          direccion: cliente.direccion || '',
          password: 'GUEST_' + Math.random().toString(36).substr(2, 9), // Password temporal
          rol: 'cliente',
          activo: true,
          emailVerificado: false
        }, { transaction });
        
        console.log('✅ Usuario invitado creado:', usuario.id);
      }
      
      finalUsuarioId = usuario.id;
    }

    // 2. Crear dirección de envío
    const direccionId = await crearDireccionEnvio(cliente, finalUsuarioId);

    // 3. Obtener carrito para calcular descuentos
    const where = usuarioId ? { usuarioId } : { sessionId };
    const carrito = await Carrito.findOne({ where });
    
    let itemsConDescuentos = items;
    let subtotal = items.reduce((sum, item) => sum + (item.precioUnitario * item.cantidad), 0);
    let totalDescuento = 0;

    // Si hay carrito, obtener items con descuentos calculados
    if (carrito) {
      const itemsCarrito = await obtenerItemsCarrito(carrito.id);
      
      if (itemsCarrito.length > 0) {
        itemsConDescuentos = itemsCarrito;
        subtotal = itemsCarrito.reduce((sum, item) => sum + item.subtotal, 0);
        totalDescuento = itemsCarrito.reduce((sum, item) => sum + item.importeDescuento, 0);
      }
    }

    // 4. Crear pedido
    const numeroPedido = generarNumeroPedido();
    
    const pedido = await Pedido.create({
      numeroPedido,
      usuarioId: finalUsuarioId,
      estado: metodoPago === 'contacto' ? 'pendiente' : 'confirmado',
      descuento: 0, // Porcentaje aplicado
      importeDescuento: totalDescuento,
      subtotal: subtotal,
      total: total,
      costoEnvio: shippingCost,
      metodoPago: metodoPago === 'contacto' ? 'otros' : metodoPago,
      estadoPago: metodoPago === 'contacto' ? 'pendiente' : 'pendiente',
      direccionEnvioId: direccionId,
      notasCliente: notasCliente || cliente.notas || '',
      fechaEstimadaEntrega: moment().add(3, 'days').toDate()
    }, { transaction });

    // 5. Crear items del pedido
    const itemsPedido = itemsConDescuentos.map(item => ({
      pedidoId: pedido.id,
      productoId: item.productoId,
      varianteId: item.varianteId,
      nombreProducto: item.nombreProducto || item.nombre,
      sku: item.sku || 'N/A',
      imagenUrl: item.imagenUrl || item.imagen || '',
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario || item.precio,
      descuento: item.descuento || 0,
      importeDescuento: item.importeDescuento || 0,
      subtotal: item.subtotal,
      total: item.total
    }));

    await ItemPedido.bulkCreate(itemsPedido, { transaction });

    // 6. Vaciar carrito después de crear el pedido
    if (carrito) {
      await ItemCarrito.destroy({
        where: { carritoId: carrito.id },
        transaction
      });
      console.log('✅ Carrito vaciado después de crear pedido');
    }

    await transaction.commit();

    // 7. Enviar respuesta
    res.status(201).json({
      mensaje: metodoPago === 'contacto' 
        ? 'Pedido registrado. Nos contactaremos pronto' 
        : 'Pedido creado exitosamente',
      pedido: {
        id: pedido.id,
        numeroPedido: pedido.numeroPedido,
        total: pedido.total,
        estado: pedido.estado,
        metodoPago: pedido.metodoPago,
        fechaEstimadaEntrega: pedido.fechaEstimadaEntrega
      }
    });

  } catch (error) {
    await transaction.rollback();
    console.error('❌ Error creando pedido:', error);
    res.status(500).json({ 
      error: 'Error al crear pedido', 
      detalle: error.message 
    });
  }
};

/**
 * @route GET /api/pedidos/usuario/:usuarioId
 * @desc Obtener pedidos de un usuario
 * @access Private
 */
const obtenerPedidosUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const { page = 1, limit = 10, estado } = req.query;

    // Verificar que el usuario solo vea sus propios pedidos (excepto admin)
    if (req.usuario.rol !== 'admin' && req.usuario.id !== parseInt(usuarioId)) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    const where = { usuarioId };
    if (estado) {
      where.estado = estado;
    }

    const offset = (page - 1) * limit;

    const { count, rows: pedidos } = await Pedido.findAndCountAll({
      where,
      include: [ 
        {
          model: DireccionEnvio,
          attributes: ['calle', 'ciudad', 'barrio']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      pedidos,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Error obteniendo pedidos:', error);
    res.status(500).json({ 
      error: 'Error al obtener pedidos', 
      detalle: error.message 
    });
  }
};

/**
 * @route GET /api/pedidos/:id
 * @desc Obtener detalle de un pedido
 * @access Private
 */
const obtenerPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const pedido = await Pedido.findByPk(id, {
      include: [
        {
          model: Usuario,
          attributes: ['id', 'nombre', 'email', 'telefono']
        },
        {
          model: DireccionEnvio,
          attributes: ['calle', 'numero', 'ciudad', 'barrio', 'referencia']
        },
        {
          model: ItemPedido,
          attributes: [
            'id', 'nombreProducto', 'sku', 'imagenUrl',
            'cantidad', 'precioUnitario', 'descuento', 
            'importeDescuento', 'subtotal', 'total'
          ]
        }
      ]
    });

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    // Verificar permisos (solo el dueño o admin)
    if (req.usuario.rol !== 'admin' && req.usuario.id !== pedido.usuarioId) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    res.json({ pedido });

  } catch (error) {
    console.error('Error obteniendo pedido:', error);
    res.status(500).json({ 
      error: 'Error al obtener pedido', 
      detalle: error.message 
    });
  }
};

/**
 * @route PUT /api/pedidos/:id/estado
 * @desc Actualizar estado de un pedido
 * @access Admin/Vendedor
 */
const actualizarEstadoPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, codigoSeguimiento, notasInternas } = req.body;

    const estadosValidos = ['pendiente', 'confirmado', 'preparando', 'enviado', 'entregado', 'cancelado'];
    
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ error: 'Estado no válido' });
    }

    const pedido = await Pedido.findByPk(id);
    
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    const updateData = { estado };
    
    if (codigoSeguimiento) {
      updateData.codigoSeguimiento = codigoSeguimiento;
    }
    
    if (notasInternas) {
      updateData.notasInternas = notasInternas;
    }

    await pedido.update(updateData);

    res.json({
      mensaje: 'Estado del pedido actualizado',
      pedido: {
        id: pedido.id,
        numeroPedido: pedido.numeroPedido,
        estado: pedido.estado,
        codigoSeguimiento: pedido.codigoSeguimiento
      }
    });

  } catch (error) {
    console.error('Error actualizando estado:', error);
    res.status(500).json({ 
      error: 'Error al actualizar estado', 
      detalle: error.message 
    });
  }
};

/**
 * @route GET /api/pedidos/admin/todos
 * @desc Obtener todos los pedidos (Admin)
 * @access Admin
 */
const obtenerTodosPedidos = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      estado, 
      metodoPago,
      fechaDesde,
      fechaHasta,
      buscar 
    } = req.query;

    const where = {};
    
    if (estado) where.estado = estado;
    if (metodoPago) where.metodoPago = metodoPago;
    
    if (fechaDesde || fechaHasta) {
      where.createdAt = {};
      if (fechaDesde) where.createdAt[Op.gte] = moment(fechaDesde).startOf('day').toDate();
      if (fechaHasta) where.createdAt[Op.lte] = moment(fechaHasta).endOf('day').toDate();
    }

    if (buscar) {
      where[Op.or] = [
        { numeroPedido: { [Op.like]: `%${buscar}%` } },
        { '$Usuario.nombre$': { [Op.like]: `%${buscar}%` } },
        { '$Usuario.email$': { [Op.like]: `%${buscar}%` } }
      ];
    }

    const offset = (page - 1) * limit;

    const { count, rows: pedidos } = await Pedido.findAndCountAll({
      where,
      include: [
        {
          model: Usuario,
          attributes: ['id', 'nombre', 'email', 'telefono']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      pedidos,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Error obteniendo pedidos:', error);
    res.status(500).json({ 
      error: 'Error al obtener pedidos', 
      detalle: error.message 
    });
  }
};

module.exports = {
  crearPedido,
  obtenerPedidosUsuario,
  obtenerPedido,
  actualizarEstadoPedido,
  obtenerTodosPedidos
};