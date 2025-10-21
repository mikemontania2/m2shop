const { Op } = require('sequelize');
const Marca = require('../models/Marca.models');
const { sequelize } = require('../../dbconfig');


const crear = async (req, res) => {
  try {
      const marca = await Marca.create(req.body);
      res.status(201).json({ mensaje: 'Marca creada', marca });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al crear marca', error: error.message });
    }
};
  
const listar = async (req, res) => {
   try {
      const { activo } = req.query;
      const where = {};
      if (activo !== undefined) where.activo = activo === 'true';

      const marcas = await Marca.findAll({
        where,
        order: [['nombre', 'ASC']]
      });

      res.json(marcas);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al listar marcas', error: error.message });
    }
};


const obtenerPorSlug= async  (req, res) => {
    try {
      const { slug } = req.params;

      const marca = await Marca.findOne({
        where: { slug, activo: true }
      });

      if (!marca) {
        return res.status(404).json({ mensaje: 'Marca no encontrada' });
      }

      res.json(marca);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener marca', error: error.message });
    }
  };



const actualizar= async(req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Marca.update(req.body, { where: { id } });

      if (!updated) {
        return res.status(404).json({ mensaje: 'Marca no encontrada' });
      }

      const marcaActualizada = await Marca.findByPk(id);
      res.json({ mensaje: 'Marca actualizada', marca: marcaActualizada });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar marca', error: error.message });
    }
  };



const eliminar= async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Marca.update({ activo: false }, { where: { id } });

      if (!updated) {
        return res.status(404).json({ mensaje: 'Marca no encontrada' });
      }

      res.json({ mensaje: 'Marca desactivada' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar marca', error: error.message });
    }
  } ;

module.exports = {
  eliminar,actualizar,obtenerPorSlug,listar,crear
};
