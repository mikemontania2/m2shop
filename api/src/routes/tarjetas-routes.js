// ========================================
// tarjeta.routes.js - Rutas de Tarjetas
// ========================================

const { Router } = require('express');
const tarjetaController = require('../controllers/tarjeta.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Todas las rutas requieren autenticación
router.use(validarJWT);

/**
 * @route GET /api/tarjetas/usuario/:userId
 * @desc Obtener tarjetas de un usuario
 * @access Private
 */
router.get('/usuario/:userId', tarjetaController.obtenerTarjetasPorUsuario);

/**
 * @route GET /api/tarjetas/:id
 * @desc Obtener tarjeta por ID
 * @access Private
 */
router.get('/:id', tarjetaController.obtenerTarjetaPorId);

/**
 * @route POST /api/tarjetas
 * @desc Registrar nueva tarjeta
 * @access Private
 */
router.post('/', tarjetaController.crearTarjeta);

/**
 * @route PUT /api/tarjetas/:id
 * @desc Actualizar tarjeta
 * @access Private
 */
router.put('/:id', tarjetaController.actualizarTarjeta);

/**
 * @route DELETE /api/tarjetas/:id
 * @desc Eliminar tarjeta
 * @access Private
 */
router.delete('/:id', tarjetaController.eliminarTarjeta);

module.exports = router;