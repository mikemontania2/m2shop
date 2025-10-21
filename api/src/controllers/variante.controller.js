const { Op } = require('sequelize');
const Usuario = require('../models/Usuario.models');
const { sequelize } = require('../../dbconfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Variante = require('../models/Variante.models');
 
 // Crear variante
  const crear = async (req, res) => {
    try {
      const variante = await Variante.create(req.body);
      res.status(201).json({ mensaje: 'Variante creada', variante });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al crear variante', error: error.message });
    }
  }

  // Listar variantes de un producto
 const listarPorProducto = async (req, res) => {
    try {
      const { productoId } = req.params;

      const variantes = await Variante.findAll({
        where: { productoId, activo: true },
        order: [['nombre', 'ASC']]
      });

      res.json(variantes);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al listar variantes', error: error.message });
    }
  }

  // Actualizar variante
 const actualizar= async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Variante.update(req.body, { where: { id } });

      if (!updated) {
        return res.status(404).json({ mensaje: 'Variante no encontrada' });
      }

      const varianteActualizada = await Variante.findByPk(id);
      res.json({ mensaje: 'Variante actualizada', variante: varianteActualizada });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar variante', error: error.message });
    }
  }

  // Eliminar variante
  const eliminar = async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Variante.update({ activo: false }, { where: { id } });

      if (!updated) {
        return res.status(404).json({ mensaje: 'Variante no encontrada' });
      }

      res.json({ mensaje: 'Variante desactivada' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar variante', error: error.message });
    }
  }

  // Actualizar stock de variante
 const actualizarStock = async (req, res) => {
    try {
      const { id } = req.params;
      const { cantidad, operacion } = req.body;

      const variante = await Variante.findByPk(id);
      if (!variante) {
        return res.status(404).json({ mensaje: 'Variante no encontrada' });
      }

      let nuevoStock = variante.stock;
      if (operacion === 'agregar') {
        nuevoStock += cantidad;
      } else if (operacion === 'restar') {
        nuevoStock -= cantidad;
        if (nuevoStock < 0) nuevoStock = 0;
      }

      await Variante.update({ stock: nuevoStock }, { where: { id } });

      res.json({ mensaje: 'Stock actualizado', stockActual: nuevoStock });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar stock', error: error.message });
    }
  }
module.exports = {
  crear,listarPorProducto,actualizar,eliminar,actualizarStock
};
