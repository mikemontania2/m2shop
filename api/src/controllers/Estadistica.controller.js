const { Op } = require('sequelize');
const Producto = require('../models/Producto.models');
const Pedido = require('../models/Pedido.models');
const ItemPedido = require('../models/ItemPedido.models');
const Resena = require('../models/Resena.models'); 

const { sequelize } = require('../../dbconfig');

const obtenerDashboard= async (req, res) => {
    try {
      // Total de pedidos
      const totalPedidos = await Pedido.count();
      
      // Pedidos del mes actual
      const inicioMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const pedidosMes = await Pedido.count({
        where: {
          createdAt: { [Op.gte]: inicioMes }
        }
      });

      // Ventas totales
      const ventasTotales = await Pedido.sum('total', {
        where: { estadoPago: 'pagado' }
      });

      // Ventas del mes
      const ventasMes = await Pedido.sum('total', {
        where: {
          estadoPago: 'pagado',
          createdAt: { [Op.gte]: inicioMes }
        }
      });

      // Productos con stock bajo
      const productosStockBajo = await Producto.count({
        where: {
          stock: { [Op.lte]: sequelize.col('stock_minimo') },
          activo: true
        }
      });

      // Total de usuarios
      const totalUsuarios = await Usuario.count({
        where: { rol: 'cliente' }
      });

      // Pedidos pendientes
      const pedidosPendientes = await Pedido.count({
        where: { estado: { [Op.in]: ['pendiente', 'confirmado'] } }
      });

      // Reseñas pendientes de aprobación
      const resenasPendientes = await Resena.count({
        where: { aprobado: false }
      });

      // Productos más vendidos (top 5)
      const productosMasVendidos = await ItemPedido.findAll({
        attributes: [
          'productoId',
          'nombreProducto',
          [sequelize.fn('SUM', sequelize.col('cantidad')), 'totalVendido']
        ],
        include: [{
          model: Producto,
          attributes: ['id', 'nombre', 'slug'],
          include: [{
            model: ImagenProducto,
            where: { esPrincipal: true },
            required: false
          }]
        }],
        group: ['productoId'],
        order: [[sequelize.fn('SUM', sequelize.col('cantidad')), 'DESC']],
        limit: 5
      });

      // Ventas por día (últimos 7 días)
      const hace7Dias = new Date();
      hace7Dias.setDate(hace7Dias.getDate() - 7);

      const ventasPorDia = await Pedido.findAll({
        attributes: [
          [sequelize.fn('DATE', sequelize.col('created_at')), 'fecha'],
          [sequelize.fn('COUNT', sequelize.col('id')), 'cantidad'],
          [sequelize.fn('SUM', sequelize.col('total')), 'total']
        ],
        where: {
          createdAt: { [Op.gte]: hace7Dias },
          estadoPago: 'pagado'
        },
        group: [sequelize.fn('DATE', sequelize.col('created_at'))],
        order: [[sequelize.fn('DATE', sequelize.col('created_at')), 'ASC']]
      });

      res.json({
        resumen: {
          totalPedidos,
          pedidosMes,
          ventasTotales: ventasTotales || 0,
          ventasMes: ventasMes || 0,
          productosStockBajo,
          totalUsuarios,
          pedidosPendientes,
          resenasPendientes
        },
        productosMasVendidos,
        ventasPorDia
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener estadísticas', error: error.message });
    }
  }

  // Reporte de ventas
  const reporteVentas=  async (req, res) => {
    try {
      const { fechaInicio, fechaFin } = req.query;

      const where = { estadoPago: 'pagado' };
      if (fechaInicio) where.createdAt = { [Op.gte]: new Date(fechaInicio) };
      if (fechaFin) where.createdAt = { ...where.createdAt, [Op.lte]: new Date(fechaFin) };

      const ventas = await Pedido.findAll({
        where,
        attributes: [
          'id',
          'numeroPedido',
          'total',
          'metodoPago',
          'createdAt'
        ],
        include: [
          { model: Usuario, attributes: ['nombre', 'apellido', 'email'] },
          { model: ItemPedido }
        ],
        order: [['createdAt', 'DESC']]
      });

      const totalVentas = ventas.reduce((sum, venta) => sum + parseFloat(venta.total), 0);
      const cantidadPedidos = ventas.length;

      res.json({
        totalVentas,
        cantidadPedidos,
        promedioVenta: cantidadPedidos > 0 ? totalVentas / cantidadPedidos : 0,
        ventas
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al generar reporte', error: error.message });
    }
  }
module.exports = {
  obtenerDashboard,reporteVentas
};
