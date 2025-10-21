const { Op } = require('sequelize');
const MetodoEnvio = require('../models/MetodoEnvio.models');
const { sequelize } = require('../../dbconfig');

 // Listar métodos de envío activos
 const listar= async (req, res) => {
    try {
      const metodos = await MetodoEnvio.findAll({
        where: { activo: true },
        order: [['costo', 'ASC']]
      });

      res.json(metodos);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al listar métodos de envío', error: error.message });
    }
  }

  // Crear método de envío
  const crear= async (req, res) => {
    try {
      const metodo = await MetodoEnvio.create(req.body);
      res.status(201).json({ mensaje: 'Método de envío creado', metodo });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al crear método de envío', error: error.message });
    }
  }

  // Actualizar método de envío
  const actualizar= async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await MetodoEnvio.update(req.body, { where: { id } });

      if (!updated) {
        return res.status(404).json({ mensaje: 'Método de envío no encontrado' });
      }

      const metodoActualizado = await MetodoEnvio.findByPk(id);
      res.json({ mensaje: 'Método de envío actualizado', metodo: metodoActualizado });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar método de envío', error: error.message });
    }
  }

  // Eliminar método de envío
 const eliminar= async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await MetodoEnvio.update({ activo: false }, { where: { id } });

      if (!updated) {
        return res.status(404).json({ mensaje: 'Método de envío no encontrado' });
      }

      res.json({ mensaje: 'Método de envío desactivado' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar método de envío', error: error.message });
    }
  }
 

module.exports = {
  listar,crear,actualizar,eliminar
};
