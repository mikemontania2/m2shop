const { Op } = require('sequelize');
const Banner = require('../models/banner.model');
 
  // Crear banner (admin)
  const crear= async (req, res) => {
    try {
      const banner = await Banner.create(req.body);
      res.status(201).json({ mensaje: 'Banner creado exitosamente', banner });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al crear banner', error: error.message });
    }
  } 

  // Listar banners (admin - todos)
  const listarTodos = async (req, res) => {
    try {
      const { page = 1, limit = 20, activo } = req.query;
      const offset = (page - 1) * limit;

      const where = {};
      if (activo !== undefined) where.activo = activo === 'true';

      const { count, rows } = await Banner.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['orden', 'ASC'], ['createdAt', 'DESC']]
      });

      res.json({
        total: count,
        paginas: Math.ceil(count / limit),
        paginaActual: parseInt(page),
        banners: rows
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al listar banners', error: error.message });
    }
  } 

  // Listar banners activos (público)
 const listarActivos= async (req, res) => {
    try {
      const { tipoDispositivo = 'todos' } = req.query;
      const fechaActual = new Date();

      const where = {
        activo: true,
        [Op.or]: [
          { fechaInicio: null },
          { fechaInicio: { [Op.lte]: fechaActual } }
        ],
        [Op.and]: [
          {
            [Op.or]: [
              { fechaFin: null },
              { fechaFin: { [Op.gte]: fechaActual } }
            ]
          }
        ]
      };

      // Filtrar por tipo de dispositivo
      if (tipoDispositivo !== 'todos') {
        where[Op.or] = [
          { tipoDispositivo: 'todos' },
          { tipoDispositivo: tipoDispositivo }
        ];
      }

      const banners = await Banner.findAll({
        where,
        order: [['orden', 'ASC'], ['createdAt', 'DESC']]
      });

      res.json(banners);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al listar banners activos', error: error.message });
    }
  } 

  // Obtener banner por ID
 const obtenerPorId= async (req, res) => {
    try {
      const { id } = req.params;

      const banner = await Banner.findByPk(id);

      if (!banner) {
        return res.status(404).json({ mensaje: 'Banner no encontrado' });
      }

      res.json(banner);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener banner', error: error.message });
    }
  } 

  // Actualizar banner (admin)
  const actualizar = async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Banner.update(req.body, { where: { id } });

      if (!updated) {
        return res.status(404).json({ mensaje: 'Banner no encontrado' });
      }

      const bannerActualizado = await Banner.findByPk(id);
      res.json({ mensaje: 'Banner actualizado', banner: bannerActualizado });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar banner', error: error.message });
    }
  } 
  // Actualizar orden de banners (admin)
 const actualizarOrden = async (req, res) => {
    try {
      const { banners } = req.body; // Array de { id, orden }

      for (const banner of banners) {
        await Banner.update(
          { orden: banner.orden },
          { where: { id: banner.id } }
        );
      }

      res.json({ mensaje: 'Orden de banners actualizado' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar orden', error: error.message });
    }
  } 

  // Activar/Desactivar banner (admin)
  const toggleActivo = async (req, res) => {
    try {
      const { id } = req.params;

      const banner = await Banner.findByPk(id);
      if (!banner) {
        return res.status(404).json({ mensaje: 'Banner no encontrado' });
      }

      await Banner.update(
        { activo: !banner.activo },
        { where: { id } }
      );

      res.json({ 
        mensaje: `Banner ${banner.activo ? 'desactivado' : 'activado'}`,
        activo: !banner.activo
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al cambiar estado', error: error.message });
    }
  } 
  // Eliminar banner (admin)
  const eliminar= async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await Banner.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({ mensaje: 'Banner no encontrado' });
      }

      res.json({ mensaje: 'Banner eliminado' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar banner', error: error.message });
    }
  } 
  module.exports = {
  eliminar,toggleActivo,actualizarOrden,actualizar,obtenerPorId,listarActivos,listarTodos,crear
};
