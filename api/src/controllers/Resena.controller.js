const { Op } = require('sequelize');
const Resena = require('../models/Resena.models');
const Pedido = require('../models/Pedido.models');
 
const { sequelize } = require('../../dbconfig');


const crear= async (req, res) => {
    try {
      const { productoId, pedidoId, calificacion, titulo, comentario } = req.body;
      const usuarioId = req.usuario.id;

      // Verificar que el usuario compró el producto
      const pedido = await Pedido.findOne({
        where: { id: pedidoId, usuarioId },
        include: [{
          model: ItemPedido,
          where: { productoId }
        }]
      });

      if (!pedido) {
        return res.status(400).json({ mensaje: 'Solo puedes reseñar productos que has comprado' });
      }

      // Verificar que no haya reseñado ya
      const resenaExistente = await Resena.findOne({
        where: { productoId, usuarioId }
      });

      if (resenaExistente) {
        return res.status(400).json({ mensaje: 'Ya has reseñado este producto' });
      }

      const resena = await Resena.create({
        productoId,
        usuarioId,
        pedidoId,
        calificacion,
        titulo,
        comentario,
        aprobado: false // Requiere aprobación
      });

      res.status(201).json({ mensaje: 'Reseña creada, pendiente de aprobación', resena });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al crear reseña', error: error.message });
    }
  };
 const  listarPorProducto= async (req, res) => {
    try {
      const { productoId } = req.params;
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const { count, rows } = await Resena.findAndCountAll({
        where: { productoId, aprobado: true },
        include: [{ model: Usuario, attributes: ['id', 'nombre', 'apellido'] }],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
      });

      // Calcular promedio de calificación
      const todasResenas = await Resena.findAll({
        where: { productoId, aprobado: true },
        attributes: ['calificacion']
      });

      const promedioCalificacion = todasResenas.length > 0
        ? todasResenas.reduce((sum, r) => sum + r.calificacion, 0) / todasResenas.length
        : 0;

      res.json({
        total: count,
        paginas: Math.ceil(count / limit),
        paginaActual: parseInt(page),
        promedioCalificacion: promedioCalificacion.toFixed(1),
        resenas: rows
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al listar reseñas', error: error.message });
    }
  }

  // Aprobar reseña (admin)
  const aprobar= async (req, res) => {
    try {
      const { id } = req.params;

      const [updated] = await Resena.update(
        { aprobado: true },
        { where: { id } }
      );

      if (!updated) {
        return res.status(404).json({ mensaje: 'Reseña no encontrada' });
      }

      res.json({ mensaje: 'Reseña aprobada' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al aprobar reseña', error: error.message });
    }
  }

  // Listar reseñas pendientes (admin)
 const listarPendientes= async (req, res) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const offset = (page - 1) * limit;

      const { count, rows } = await Resena.findAndCountAll({
        where: { aprobado: false },
        include: [
          { model: Usuario, attributes: ['id', 'nombre', 'apellido', 'email'] },
          { model: Producto, attributes: ['id', 'nombre', 'slug'] }
        ],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
      });

      res.json({
        total: count,
        paginas: Math.ceil(count / limit),
        paginaActual: parseInt(page),
        resenas: rows
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al listar reseñas pendientes', error: error.message });
    }
  }

  // Eliminar reseña
 const eliminar= async (req, res) => {
    try {
      const { id } = req.params;
      const usuarioId = req.usuario.id;
      const rol = req.usuario.rol;

      const where = { id };
      if (rol === 'cliente') {
        where.usuarioId = usuarioId;
      }

      const deleted = await Resena.destroy({ where });

      if (!deleted) {
        return res.status(404).json({ mensaje: 'Reseña no encontrada' });
      }

      res.json({ mensaje: 'Reseña eliminada' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar reseña', error: error.message });
    }
  }

module.exports = {
  crear,listarPorProducto,aprobar,listarPendientes,eliminar
};
