const { Op } = require('sequelize');
const DireccionEnvio = require('../models/DireccionEnvio.models');
const Barrio = require('../models/Barrio.models');
const Ciudad = require('../models/Ciudad.models');
const Departamento = require('../models/Departamento.models');


const { sequelize } = require('../../dbconfig');


const crear= async (req, res) => {
    try {
      const direccionData = { ...req.body, usuarioId: req.usuario.id };

      // Si es principal, desmarcar otras direcciones
      if (direccionData.esPrincipal) {
        await DireccionEnvio.update(
          { esPrincipal: false },
          { where: { usuarioId: req.usuario.id } }
        );
      }

      const direccion = await DireccionEnvio.create(direccionData);
      res.status(201).json({ mensaje: 'Dirección creada', direccion });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al crear dirección', error: error.message });
    }
  };
 const  listar= async (req, res) => {
    try {
      const direcciones = await DireccionEnvio.findAll({
        where: { usuarioId: req.usuario.id },
        include: [{ 
          model: Barrio, 
          include: [{ 
            model: Ciudad,
            include: [{ model: Departamento }]
          }] 
        }],
        order: [['esPrincipal', 'DESC'], ['createdAt', 'DESC']]
      });

      res.json(direcciones);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al listar direcciones', error: error.message });
    }
  }
  const obtenerPorId= async (req, res) => {
    try {
      const { id } = req.params;

      const direccion = await DireccionEnvio.findOne({
        where: { id, usuarioId: req.usuario.id },
        include: [{ 
          model: Barrio, 
          include: [{ 
            model: Ciudad,
            include: [{ model: Departamento }]
          }] 
        }]
      });

      if (!direccion) {
        return res.status(404).json({ mensaje: 'Dirección no encontrada' });
      }

      res.json(direccion);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener dirección', error: error.message });
    }
  }

  const actualizar= async (req, res) => {
    try {
      const { id } = req.params;
      const direccionData = req.body;

      // Verificar que la dirección pertenece al usuario
      const direccion = await DireccionEnvio.findOne({
        where: { id, usuarioId: req.usuario.id }
      });

      if (!direccion) {
        return res.status(404).json({ mensaje: 'Dirección no encontrada' });
      }

      // Si se marca como principal, desmarcar otras
      if (direccionData.esPrincipal) {
        await DireccionEnvio.update(
          { esPrincipal: false },
          { where: { usuarioId: req.usuario.id, id: { [Op.ne]: id } } }
        );
      }

      await DireccionEnvio.update(direccionData, { where: { id } });

      const direccionActualizada = await DireccionEnvio.findByPk(id);
      res.json({ mensaje: 'Dirección actualizada', direccion: direccionActualizada });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar dirección', error: error.message });
    }
  }

  const  eliminar= async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await DireccionEnvio.destroy({
        where: { id, usuarioId: req.usuario.id }
      });

      if (!deleted) {
        return res.status(404).json({ mensaje: 'Dirección no encontrada' });
      }

      res.json({ mensaje: 'Dirección eliminada' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar dirección', error: error.message });
    }
  }

  const  marcarPrincipal= async (req, res) => {
    try {
      const { id } = req.params;

      // Desmarcar todas
      await DireccionEnvio.update(
        { esPrincipal: false },
        { where: { usuarioId: req.usuario.id } }
      );

      // Marcar la seleccionada
      const [updated] = await DireccionEnvio.update(
        { esPrincipal: true },
        { where: { id, usuarioId: req.usuario.id } }
      );

      if (!updated) {
        return res.status(404).json({ mensaje: 'Dirección no encontrada' });
      }

      res.json({ mensaje: 'Dirección marcada como principal' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al marcar dirección', error: error.message });
    }
  }

module.exports = {
  crear,listar,obtenerPorId,actualizar,eliminar,marcarPrincipal
};
