const { Op } = require('sequelize');
const Pais = require('../models/Pais.models');
const Ciudad = require('../models/Ciudad.models');
const Departamento = require('../models/Departamento.models');
const Barrio = require('../models/Barrio.models');

const { sequelize } = require('../../dbconfig');
  // Listar países
const  listarPaises= async (req, res) => {
    try {
      const paises = await Pais.findAll({ order: [['nombre', 'ASC']] });
      res.json(paises);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al listar países', error: error.message });
    }
  }

  // Listar departamentos por país
  const listarDepartamentos= async (req, res) => {
    try {
      const { codigoPais } = req.params;
      const departamentos = await Departamento.findAll({
        where: { codigoPais },
        order: [['nombre', 'ASC']]
      });
      res.json(departamentos);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al listar departamentos', error: error.message });
    }
  }

  // Listar ciudades por departamento
const  listarCiudades= async (req, res) => {
    try {
      const { departamentoId } = req.params;
      const ciudades = await Ciudad.findAll({
        where: { departamentoId },
        order: [['nombre', 'ASC']]
      });
      res.json(ciudades);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al listar ciudades', error: error.message });
    }
  }

  // Listar barrios por ciudad
  const listarBarrios= async (req, res) => {
    try {
      const { ciudadId } = req.params;
      const barrios = await Barrio.findAll({
        where: { ciudadId },
        order: [['descripcion', 'ASC']]
      });
      res.json(barrios);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al listar barrios', error: error.message });
    }
  }

module.exports = {
  listarBarrios,listarCiudades,listarDepartamentos,listarPaises
};
