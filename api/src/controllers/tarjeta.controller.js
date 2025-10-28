
// ========================================
// tarjeta.controller.js - Gestión de Tarjetas de Pago
// ========================================

const Tarjeta = require('../models/Tarjeta.models');

/**
 * @route GET /api/tarjetas/usuario/:userId
 * @desc Obtener todas las tarjetas de un usuario
 * @access Private
 */
const obtenerTarjetasPorUsuario = async (req, res = response) => {
  try {
    const { userId } = req.params;

    // Verificar que el usuario solo pueda ver sus propias tarjetas (o sea admin)
    if (req.usuario.id !== parseInt(userId) && req.usuario.rol !== 'admin') {
      return res.status(403).json({
        error: 'No tienes permiso para acceder a estas tarjetas'
      });
    }

    const tarjetas = await Tarjeta.findAll({
      where: { usuarioId: userId },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      total: tarjetas.length,
      tarjetas
    });
  } catch (error) {
    console.error('Error obteniendo tarjetas:', error);
    res.status(500).json({
      error: 'Error al obtener tarjetas'
    });
  }
};

/**
 * @route GET /api/tarjetas/:id
 * @desc Obtener una tarjeta por ID
 * @access Private
 */
const obtenerTarjetaPorId = async (req, res = response) => {
  try {
    const { id } = req.params;

    const tarjeta = await Tarjeta.findByPk(id);

    if (!tarjeta) {
      return res.status(404).json({
        error: 'Tarjeta no encontrada'
      });
    }

    // Verificar propiedad
    if (tarjeta.usuarioId !== req.usuario.id && req.usuario.rol !== 'admin') {
      return res.status(403).json({
        error: 'No tienes permiso para acceder a esta tarjeta'
      });
    }

    res.json({ tarjeta });
  } catch (error) {
    console.error('Error obteniendo tarjeta:', error);
    res.status(500).json({
      error: 'Error al obtener la tarjeta'
    });
  }
};

/**
 * @route POST /api/tarjetas
 * @desc Registrar nueva tarjeta
 * @access Private
 */
const crearTarjeta = async (req, res = response) => {
  try {
    const {
      titular,
      ultimos4,
      marca,
      mesVencimiento,
      anioVencimiento
    } = req.body;

    // Validaciones
    if (!titular || !ultimos4 || !marca || !mesVencimiento || !anioVencimiento) {
      return res.status(400).json({
        error: 'Todos los campos son requeridos'
      });
    }

    if (ultimos4.length !== 4) {
      return res.status(400).json({
        error: 'Últimos 4 dígitos debe tener exactamente 4 caracteres'
      });
    }

    if (mesVencimiento < 1 || mesVencimiento > 12) {
      return res.status(400).json({
        error: 'Mes de vencimiento inválido'
      });
    }

    const currentYear = new Date().getFullYear();
    if (anioVencimiento < currentYear) {
      return res.status(400).json({
        error: 'La tarjeta está vencida'
      });
    }

    // Generar ID único para la tarjeta
    const tarjetaId = `card-${req.usuario.id}-${Date.now()}`;

    const nuevaTarjeta = await Tarjeta.create({
      id: tarjetaId,
      usuarioId: req.usuario.id,
      titular,
      ultimos4,
      marca: marca.toLowerCase(),
      mesVencimiento,
      anioVencimiento
    });

    res.status(201).json({
      mensaje: 'Tarjeta registrada exitosamente',
      tarjeta: nuevaTarjeta
    });
  } catch (error) {
    console.error('Error creando tarjeta:', error);
    res.status(500).json({
      error: error?.original?.detail || 'Error al registrar la tarjeta'
    });
  }
};

/**
 * @route PUT /api/tarjetas/:id
 * @desc Actualizar información de tarjeta
 * @access Private
 */
const actualizarTarjeta = async (req, res = response) => {
  try {
    const { id } = req.params;
    const {
      titular,
      ultimos4,
      marca,
      mesVencimiento,
      anioVencimiento
    } = req.body;

    const tarjeta = await Tarjeta.findByPk(id);

    if (!tarjeta) {
      return res.status(404).json({
        error: 'Tarjeta no encontrada'
      });
    }

    // Verificar propiedad
    if (tarjeta.usuarioId !== req.usuario.id && req.usuario.rol !== 'admin') {
      return res.status(403).json({
        error: 'No tienes permiso para modificar esta tarjeta'
      });
    }

    // Validar mes si se proporciona
    if (mesVencimiento && (mesVencimiento < 1 || mesVencimiento > 12)) {
      return res.status(400).json({
        error: 'Mes de vencimiento inválido'
      });
    }

    // Actualizar campos
    if (titular !== undefined) tarjeta.titular = titular;
    if (ultimos4 !== undefined) tarjeta.ultimos4 = ultimos4.slice(0, 4);
    if (marca !== undefined) tarjeta.marca = marca.toLowerCase();
    if (mesVencimiento !== undefined) tarjeta.mesVencimiento = mesVencimiento;
    if (anioVencimiento !== undefined) tarjeta.anioVencimiento = anioVencimiento;

    await tarjeta.save();

    res.json({
      mensaje: 'Tarjeta actualizada exitosamente',
      tarjeta
    });
  } catch (error) {
    console.error('Error actualizando tarjeta:', error);
    res.status(500).json({
      error: error?.original?.detail || 'Error al actualizar la tarjeta'
    });
  }
};

/**
 * @route DELETE /api/tarjetas/:id
 * @desc Eliminar tarjeta
 * @access Private
 */
const eliminarTarjeta = async (req, res = response) => {
  try {
    const { id } = req.params;

    const tarjeta = await Tarjeta.findByPk(id);

    if (!tarjeta) {
      return res.status(404).json({
        error: 'Tarjeta no encontrada'
      });
    }

    // Verificar propiedad
    if (tarjeta.usuarioId !== req.usuario.id && req.usuario.rol !== 'admin') {
      return res.status(403).json({
        error: 'No tienes permiso para eliminar esta tarjeta'
      });
    }

    await tarjeta.destroy();

    res.json({
      mensaje: 'Tarjeta eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando tarjeta:', error);
    res.status(500).json({
      error: 'Error al eliminar la tarjeta'
    });
  }
};

module.exports = {
  obtenerTarjetasPorUsuario,
  obtenerTarjetaPorId,
  crearTarjeta,
  actualizarTarjeta,
  eliminarTarjeta
};