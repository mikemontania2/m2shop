const { Op } = require('sequelize');
const ConfiguracionSitio = require('../models/ConfiguracionSitio.models');
const { sequelize } = require('../../dbconfig');

 const obtenerTodas= async (req, res) => {
    try {
      const configuraciones = await ConfiguracionSitio.findAll();

      // Convertir a objeto clave-valor
      const config = {};
      configuraciones.forEach(item => {
        let valor = item.valor;
        if (item.tipo === 'numero') valor = parseFloat(valor);
        if (item.tipo === 'booleano') valor = valor === 'true';
        if (item.tipo === 'json') {
          try {
            valor = JSON.parse(valor);
          } catch (e) {
            valor = item.valor;
          }
        }
        config[item.clave] = valor;
      });

      res.json(config);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener configuraciones', error: error.message });
    }
  }

  // Obtener configuración por clave
  const obtenerPorClave= async (req, res) => {
    try {
      const { clave } = req.params;

      const config = await ConfiguracionSitio.findOne({ where: { clave } });

      if (!config) {
        return res.status(404).json({ mensaje: 'Configuración no encontrada' });
      }

      let valor = config.valor;
      if (config.tipo === 'numero') valor = parseFloat(valor);
      if (config.tipo === 'booleano') valor = valor === 'true';
      if (config.tipo === 'json') {
        try {
          valor = JSON.parse(valor);
        } catch (e) {
          valor = config.valor;
        }
      }

      res.json({ clave: config.clave, valor, tipo: config.tipo });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener configuración', error: error.message });
    }
  }

   // Actualizar configuración
  const actualizar= async (req, res) => {
    try {
      const { clave } = req.params;
      let { valor } = req.body;

      const config = await ConfiguracionSitio.findOne({ where: { clave } });

      if (!config) {
        return res.status(404).json({ mensaje: 'Configuración no encontrada' });
      }

      // Convertir valor según tipo
      if (config.tipo === 'json') {
        valor = JSON.stringify(valor);
      } else {
        valor = String(valor);
      }

      await ConfiguracionSitio.update({ valor }, { where: { clave } });

      res.json({ mensaje: 'Configuración actualizada' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar configuración', error: error.message });
    }
  }

  // Crear configuración
  const crear= async (req, res) => {
    try {
      let { clave, valor, tipo, descripcion } = req.body;

      if (tipo === 'json') {
        valor = JSON.stringify(valor);
      } else {
        valor = String(valor);
      }

      const config = await ConfiguracionSitio.create({ clave, valor, tipo, descripcion });

      res.status(201).json({ mensaje: 'Configuración creada', config });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al crear configuración', error: error.message });
    }
  }
 

module.exports = {
  obtenerTodas,obtenerPorClave,actualizar,crear
};
