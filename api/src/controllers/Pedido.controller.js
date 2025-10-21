const { Op } = require('sequelize');
const Pedido = require('../models/Pedido.models');
const Carrito = require('../models/Carrito.models');
const ItemPedido = require('../models/ItemPedido.models');
const HistorialPedido = require('../models/HistorialPedido.models');


const { sequelize } = require('../../dbconfig');

 const crear= async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
      const { direccionEnvioId, metodoPago, notasCliente, cuponCodigo } = req.body;
      const usuarioId = req.usuario.id;

      // Obtener carrito
      const carrito = await Carrito.findOne({
        where: { usuarioId },
        include: [{ 
          model: ItemCarrito, 
          include: [Producto, Variante] 
        }]
      });

      if (!carrito || !carrito.ItemCarritos || carrito.ItemCarritos.length === 0) {
        await transaction.rollback();
        return res.status(400).json({ mensaje: 'El carrito está vacío' });
      }

      // Calcular subtotal
      let subtotal = 0;
      carrito.ItemCarritos.forEach(item => {
        subtotal += parseFloat(item.precioUnitario) * item.cantidad;
      });

      // Aplicar cupón si existe
      let descuento = 0;
      let cuponId = null;
      
      if (cuponCodigo) {
        const cupon = await Cupon.findOne({ 
          where: { 
            codigo: cuponCodigo, 
            activo: true,
            fechaInicio: { [Op.lte]: new Date() },
            fechaFin: { [Op.gte]: new Date() }
          } 
        });

        if (cupon && subtotal >= (cupon.montoMinimo || 0)) {
          if (cupon.tipoDescuento === 'porcentaje') {
            descuento = subtotal * (parseFloat(cupon.valor) / 100);
          } else {
            descuento = parseFloat(cupon.valor);
          }
          cuponId = cupon.id;
        }
      }

      // Calcular costo de envío (simplificado - deberías usar el método de envío real)
      const costoEnvio = subtotal >= 200000 ? 0 : 15000;

      const total = subtotal - descuento + costoEnvio;

      // Generar número de pedido
      const ultimoPedido = await Pedido.findOne({ 
        order: [['id', 'DESC']],
        transaction 
      });
      const numeroOrden = ultimoPedido ? ultimoPedido.id + 1 : 1;
      const numeroPedido = `PED-${new Date().getFullYear()}-${String(numeroOrden).padStart(5, '0')}`;

      // Crear pedido
      const pedido = await Pedido.create({
        numeroPedido,
        usuarioId,
        estado: 'pendiente',
        subtotal,
        descuento,
        costoEnvio,
        total,
        metodoPago,
        estadoPago: 'pendiente',
        direccionEnvioId,
        notasCliente
      }, { transaction });

      // Crear items del pedido y actualizar stock
      for (const item of carrito.ItemCarritos) {
        // Verificar stock disponible
        const stockDisponible = item.varianteId 
          ? item.Variante.stock 
          : item.Producto.stock;

        if (stockDisponible < item.cantidad) {
          await transaction.rollback();
          return res.status(400).json({ 
            mensaje: `Stock insuficiente para ${item.Producto.nombre}` 
          });
        }

        // Crear item del pedido
        await ItemPedido.create({
          pedidoId: pedido.id,
          productoId: item.productoId,
          varianteId: item.varianteId,
          nombreProducto: item.Producto.nombre,
          sku: item.varianteId ? item.Variante.sku : item.Producto.sku,
          cantidad: item.cantidad,
          precioUnitario: item.precioUnitario,
          subtotal: parseFloat(item.precioUnitario) * item.cantidad
        }, { transaction });

        // Reducir stock
        if (item.varianteId) {
          await Variante.update(
            { stock: item.Variante.stock - item.cantidad },
            { where: { id: item.varianteId }, transaction }
          );
        } else {
          await Producto.update(
            { stock: item.Producto.stock - item.cantidad },
            { where: { id: item.productoId }, transaction }
          );
        }
      }

      // Registrar uso de cupón si aplica
      if (cuponId) {
        await UsoCupon.create({
          cuponId,
          usuarioId,
          pedidoId: pedido.id,
          montoDescuento: descuento
        }, { transaction });

        // Incrementar contador de usos del cupón
        await Cupon.increment('usosActuales', { 
          where: { id: cuponId },
          transaction 
        });
      }

      // Crear historial
      await HistorialPedido.create({
        pedidoId: pedido.id,
        estado: 'pendiente',
        comentario: 'Pedido creado',
        usuarioId
      }, { transaction });

      // Vaciar carrito
      await ItemCarrito.destroy({ 
        where: { carritoId: carrito.id },
        transaction 
      });

      await transaction.commit();

      // Obtener pedido completo
      const pedidoCompleto = await Pedido.findByPk(pedido.id, {
        include: [
          { model: ItemPedido, include: [Producto] },
          { model: DireccionEnvio }
        ]
      });

      res.status(201).json({ 
        mensaje: 'Pedido creado exitosamente', 
        pedido: pedidoCompleto 
      });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ mensaje: 'Error al crear pedido', error: error.message });
    }
  }
 
 const listarMisPedidos= async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const usuarioId = req.usuario.id;

      const { count, rows } = await Pedido.findAndCountAll({
        where: { usuarioId },
        include: [
          { model: ItemPedido, include: [Producto] },
          { model: DireccionEnvio }
        ],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
      });

      res.json({
        total: count,
        paginas: Math.ceil(count / limit),
        paginaActual: parseInt(page),
        pedidos: rows
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al listar pedidos', error: error.message });
    }
  }

    const obtenerPorId= async (req, res) => {
    try {
      const { id } = req.params;
      const usuarioId = req.usuario.id;
      const rol = req.usuario.rol;

      const where = { id };
      if (rol === 'cliente') {
        where.usuarioId = usuarioId;
      }

      const pedido = await Pedido.findOne({
        where,
        include: [
          { model: ItemPedido, include: [Producto, Variante] },
          { model: DireccionEnvio, include: [{ model: Barrio, include: [{ model: Ciudad }] }] },
          { model: HistorialPedido, include: [{ model: Usuario, attributes: ['nombre', 'apellido'] }], order: [['createdAt', 'DESC']] }
        ]
      });

      if (!pedido) {
        return res.status(404).json({ mensaje: 'Pedido no encontrado' });
      }

      res.json(pedido);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener pedido', error: error.message });
    }
  }

  const actualizarEstado= async (req, res) => {
    try {
      const { id } = req.params;
      const { estado, comentario, codigoSeguimiento } = req.body;

      const updateData = { estado };
      if (codigoSeguimiento) updateData.codigoSeguimiento = codigoSeguimiento;

      await Pedido.update(updateData, { where: { id } });

      // Crear registro en historial
      await HistorialPedido.create({
        pedidoId: id,
        estado,
        comentario,
        usuarioId: req.usuario.id
      });

      res.json({ mensaje: 'Estado del pedido actualizado' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar estado', error: error.message });
    }
  }
   const listarTodos= async (req, res) => {
    try {
      const { page = 1, limit = 20, estado } = req.query;
      const offset = (page - 1) * limit;

      const where = {};
      if (estado) where.estado = estado;

      const { count, rows } = await Pedido.findAndCountAll({
        where,
        include: [
          { model: Usuario, attributes: ['id', 'nombre', 'apellido', 'email'] },
          { model: ItemPedido }
        ],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
      });

      res.json({
        total: count,
        paginas: Math.ceil(count / limit),
        paginaActual: parseInt(page),
        pedidos: rows
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al listar pedidos', error: error.message });
    }
  }
  const cancelar= async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
      const { id } = req.params;
      const { motivo } = req.body;
      const usuarioId = req.usuario.id;
      const rol = req.usuario.rol;

      const where = { id };
      if (rol === 'cliente') {
        where.usuarioId = usuarioId;
      }

      const pedido = await Pedido.findOne({
        where,
        include: [{ model: ItemPedido }]
      });

      if (!pedido) {
        await transaction.rollback();
        return res.status(404).json({ mensaje: 'Pedido no encontrado' });
      }

      if (['entregado', 'cancelado'].includes(pedido.estado)) {
        await transaction.rollback();
        return res.status(400).json({ mensaje: 'No se puede cancelar este pedido' });
      }

      // Devolver stock
      for (const item of pedido.ItemPedidos) {
        if (item.varianteId) {
          await Variante.increment('stock', {
            by: item.cantidad,
            where: { id: item.varianteId },
            transaction
          });
        } else {
          await Producto.increment('stock', {
            by: item.cantidad,
            where: { id: item.productoId },
            transaction
          });
        }
      }

      // Actualizar estado
      await Pedido.update(
        { estado: 'cancelado' },
        { where: { id }, transaction }
      );

      // Crear historial
      await HistorialPedido.create({
        pedidoId: id,
        estado: 'cancelado',
        comentario: motivo || 'Pedido cancelado',
        usuarioId
      }, { transaction });

      await transaction.commit();

      res.json({ mensaje: 'Pedido cancelado exitosamente' });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ mensaje: 'Error al cancelar pedido', error: error.message });
    }
  }
module.exports = {
  cancelar,listarTodos,actualizarEstado,obtenerPorId,listarMisPedidos,crear
};
