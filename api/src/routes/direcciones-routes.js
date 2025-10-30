// ========================================
// direccion.routes.js - Rutas de Direcciones
// ========================================

const { Router } = require('express');
const direccionController = require('../controllers/DireccionEnvio.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Todas las rutas requieren autenticación
router.use(validarJWT);

/**
 * @route GET /api/direcciones/usuario/:userId
 * @desc Obtener direcciones de un usuario
 * @access Private
 */
router.get('/usuario/:userId', direccionController.obtenerDireccionesPorUsuario);

/**
 * @route GET /api/direcciones/:id
 * @desc Obtener dirección por ID
 * @access Private
 */
router.get('/:id', direccionController.obtenerDireccionPorId);

/**
 * @route POST /api/direcciones
 * @desc Crear nueva dirección
 * @access Private
 */
router.post('/', direccionController.crearDireccion);

/**
 * @route PUT /api/direcciones/:id
 * @desc Actualizar dirección
 * @access Private
 */
router.put('/:id', direccionController.actualizarDireccion);

/**
 * @route DELETE /api/direcciones/:id
 * @desc Eliminar dirección
 * @access Private
 */
router.delete('/:id', direccionController.eliminarDireccion);

/**
 * @route PUT /api/direcciones/:id/principal
 * @desc Marcar dirección como principal
 * @access Private
 */
router.put('/:id/principal', direccionController.marcarComoPrincipal);

module.exports = router;

 