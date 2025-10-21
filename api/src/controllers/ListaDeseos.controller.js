const { Op } = require('sequelize');
const ListaDeseos = require('../models/ListaDeseos.models');
const ImagenProducto = require('../models/ImagenProducto.models');
const Producto = require('../models/Producto.models');


const { sequelize } = require('../../dbconfig');

 // Obtener lista de deseos
  const obtener= async (req, res) => {
    try {
      const usuarioId = req.usuario.id;

      const lista = await ListaDeseos.findAll({
        where: { usuarioId },
        include: [{
          model: Producto,
          include: [
            { model: ImagenProducto, where: { esPrincipal: true }, required: false },
            { model: Marca }
          ]
        }],
        order: [['createdAt', 'DESC']]
      });

      res.json(lista);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener lista de deseos', error: error.message });
    }
  }

  // Agregar producto a lista de deseos
  const agregar= async (req, res) => {
    try {
      const { productoId } = req.body;
      const usuarioId = req.usuario.id;

      // Verificar si ya existe
      const existe = await ListaDeseos.findOne({
        where: { usuarioId, productoId }
      });

      if (existe) {
        return res.status(400).json({ mensaje: 'El producto ya está en tu lista de deseos' });
      }

      const item = await ListaDeseos.create({ usuarioId, productoId });

      res.status(201).json({ mensaje: 'Producto agregado a lista de deseos', item });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al agregar a lista de deseos', error: error.message });
    }
  }

  // Eliminar de lista de deseos
  const eliminar= async (req, res) => {
    try {
      const { id } = req.params;
      const usuarioId = req.usuario.id;

      const deleted = await ListaDeseos.destroy({
        where: { id, usuarioId }
      });

      if (!deleted) {
        return res.status(404).json({ mensaje: 'Item no encontrado' });
      }

      res.json({ mensaje: 'Producto eliminado de lista de deseos' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar de lista de deseos', error: error.message });
    }
  }

  // Eliminar por productoId
  const eliminarPorProducto= async (req, res) => {
    try {
      const { productoId } = req.params;
      const usuarioId = req.usuario.id;

      const deleted = await ListaDeseos.destroy({
        where: { productoId, usuarioId }
      });

      if (!deleted) {
        return res.status(404).json({ mensaje: 'Producto no encontrado en lista de deseos' });
      }

      res.json({ mensaje: 'Producto eliminado de lista de deseos' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar de lista de deseos', error: error.message });
    }
  }
 

module.exports = {
  obtener,agregar,eliminar,eliminarPorProducto
};
