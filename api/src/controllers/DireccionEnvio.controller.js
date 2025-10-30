// ========================================
// direccion.controller.js - Gestión de Direcciones de Envío
// ========================================

const { response } = require('express');
const { Op } = require('sequelize');
const DireccionEnvio = require('../models/DireccionEnvio.models');

/**
 * @route GET /api/direcciones/usuario/:userId
 * @desc Obtener todas las direcciones de un usuario
 * @access Private
 */
const obtenerDireccionesPorUsuario = async (req, res = response) => {
  try {
    const { userId } = req.params;

    if (req.usuario.id !== parseInt(userId) && req.usuario.rol !== 'admin') {
      return res.status(403).json({ error: 'No tienes permiso para acceder a estas direcciones' });
    }

    const direcciones = await DireccionEnvio.findAll({
      where: { usuarioId: userId },
      order: [
        ['esPrincipal', 'DESC'],
        ['createdAt', 'DESC']
      ]
    });

    res.json({
      total: direcciones.length,
      direcciones
    });
  } catch (error) {
    console.error('Error obteniendo direcciones:', error);
    res.status(500).json({ error: 'Error al obtener direcciones' });
  }
};

/**
 * @route GET /api/direcciones/:id
 * @desc Obtener una dirección por ID
 * @access Private
 */
const obtenerDireccionPorId = async (req, res = response) => {
  try {
    const { id } = req.params;
    const direccion = await DireccionEnvio.findByPk(id);

    if (!direccion) {
      return res.status(404).json({ error: 'Dirección no encontrada' });
    }

    if (direccion.usuarioId !== req.usuario.id && req.usuario.rol !== 'admin') {
      return res.status(403).json({ error: 'No tienes permiso para acceder a esta dirección' });
    }

    res.json({ direccion });
  } catch (error) {
    console.error('Error obteniendo dirección:', error);
    res.status(500).json({ error: 'Error al obtener la dirección' });
  }
};

/**
 * @route POST /api/direcciones
 * @desc Crear nueva dirección
 * @access Private
 */
const crearDireccion = async (req, res = response) => {
  try {
    const { 
      telefono,
      calle,
      numero,
      referencia,
      codigoPostal,
      departamento,transversal,lat,lng,
      ciudad,
      barrio,
      esPrincipal
    } = req.body;

    // Validar campos mínimos
    if (  !telefono || !calle) {
      return res.status(400).json({
        error: 'teléfono y calle son requeridos'
      });
    }

    // Si es principal, desmarcar las demás
    if (esPrincipal) {
      await DireccionEnvio.update(
        { esPrincipal: false },
        { where: { usuarioId: req.usuario.id } }
      );
    }

    const nuevaDireccion = await DireccionEnvio.create({
      usuarioId: req.usuario.id, 
      telefono,
      calle,transversal,lat,lng,
      numero: numero || '',
      referencia: referencia || '',
      codigoPostal: codigoPostal || '',
      departamento: departamento || null,
      ciudad: ciudad || null,
      barrio: barrio || null,
      esPrincipal: !!esPrincipal
    });

    res.status(201).json({
      mensaje: 'Dirección creada exitosamente',
      direccion: nuevaDireccion
    });
  } catch (error) {
    console.error('Error creando dirección:', error);
    res.status(500).json({
      error: error?.original?.detail || 'Error al crear la dirección'
    });
  }
};

/**
 * @route PUT /api/direcciones/:id
 * @desc Actualizar dirección existente
 * @access Private
 */
const actualizarDireccion = async (req, res = response) => {
  try {
    const { id } = req.params;
    const {
      nombreCompleto,
      telefono,
      calle,
      numero,
      referencia,
      codigoPostal,
      departamento,transversal,lat,lng,
      ciudad,
      barrio,
      esPrincipal
    } = req.body;

    const direccion = await DireccionEnvio.findByPk(id);

    if (!direccion) {
      return res.status(404).json({ error: 'Dirección no encontrada' });
    }

    if (direccion.usuarioId !== req.usuario.id && req.usuario.rol !== 'admin') {
      return res.status(403).json({ error: 'No tienes permiso para modificar esta dirección' });
    }

    // Si se marca como principal, desmarcar las demás
    if (esPrincipal && !direccion.esPrincipal) {
      await DireccionEnvio.update(
        { esPrincipal: false },
        { where: { usuarioId: req.usuario.id, id: { [Op.ne]: id } } }
      );
    }

    await direccion.update({
      nombreCompleto,
      telefono,
      calle,
      numero,
      referencia,
      codigoPostal,
      departamento,transversal,lat,lng,
      ciudad,
      barrio,
      esPrincipal
    });

    res.json({
      mensaje: 'Dirección actualizada exitosamente',
      direccion
    });
  } catch (error) {
    console.error('Error actualizando dirección:', error);
    res.status(500).json({
      error: error?.original?.detail || 'Error al actualizar la dirección'
    });
  }
};

/**
 * @route DELETE /api/direcciones/:id
 * @desc Eliminar dirección
 * @access Private
 */
const eliminarDireccion = async (req, res = response) => {
  try {
    const { id } = req.params;
    const direccion = await DireccionEnvio.findByPk(id);

    if (!direccion) {
      return res.status(404).json({ error: 'Dirección no encontrada' });
    }

    if (direccion.usuarioId !== req.usuario.id && req.usuario.rol !== 'admin') {
      return res.status(403).json({ error: 'No tienes permiso para eliminar esta dirección' });
    }

    await direccion.destroy();
    res.json({ mensaje: 'Dirección eliminada exitosamente' });
  } catch (error) {
    console.error('Error eliminando dirección:', error);
    res.status(500).json({ error: 'Error al eliminar la dirección' });
  }
};

/**
 * @route PUT /api/direcciones/:id/principal
 * @desc Marcar dirección como principal
 * @access Private
 */
const marcarComoPrincipal = async (req, res = response) => {
  try {
    const { id } = req.params;
    const direccion = await DireccionEnvio.findByPk(id);

    if (!direccion) {
      return res.status(404).json({ error: 'Dirección no encontrada' });
    }

    if (direccion.usuarioId !== req.usuario.id) {
      return res.status(403).json({ error: 'No tienes permiso para modificar esta dirección' });
    }

    // Desmarcar todas las direcciones del usuario
    await DireccionEnvio.update(
      { esPrincipal: false },
      { where: { usuarioId: req.usuario.id } }
    );

    direccion.esPrincipal = true;
    await direccion.save();

    res.json({
      mensaje: 'Dirección marcada como principal',
      direccion
    });
  } catch (error) {
    console.error('Error marcando dirección como principal:', error);
    res.status(500).json({ error: 'Error al marcar la dirección como principal' });
  }
};

module.exports = {
  obtenerDireccionesPorUsuario,
  obtenerDireccionPorId,
  crearDireccion,
  actualizarDireccion,
  eliminarDireccion,
  marcarComoPrincipal
};
