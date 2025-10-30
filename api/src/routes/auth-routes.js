const { Router } = require('express');
const authController = require('../controllers/Auth.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { roleMiddleware } = require('../middlewares/authMiddleware.mw'); // AGREGADO

const router = Router();

// ========================================
// RUTAS PÚBLICAS (No requieren autenticación)
// ========================================

/**
 * @route POST /api/auth/register
 * @desc Registrar nuevo usuario
 * @access Public
 */
router.post('/register', authController.register);

/**
 * @route POST /api/auth/login
 * @desc Iniciar sesión
 * @access Public
 */
router.post('/login', authController.login);

/**
 * @route POST /api/auth/reset-password
 * @desc Restablecer contraseña (por email o admin)
 * @access Public
 */
router.post('/reset-password', authController.resetPassword);

// ========================================
// RUTAS PROTEGIDAS (Requieren autenticación)
// ========================================

/**
 * @route POST /api/auth/renew
 * @desc Renovar token JWT
 * @access Private
 */
router.post('/renew', validarJWT, authController.renewToken);

/**
 * @route GET /api/auth/profile
 * @desc Obtener perfil del usuario autenticado
 * @access Private
 */
router.get('/profile', validarJWT, authController.getProfile);

/**
 * @route PUT /api/auth/profile
 * @desc Actualizar perfil del usuario autenticado
 * @access Private
 */
router.put('/profile', validarJWT, authController.updateProfile);

/**
 * @route PUT /api/auth/update-password
 * @desc Cambiar contraseña (requiere contraseña actual)
 * @access Private
 */
router.put('/update-password', validarJWT, authController.updatePassword);

/**
 * @route POST /api/auth/logout
 * @desc Cerrar sesión
 * @access Private
 */
router.post('/logout', validarJWT, authController.logout);

// ========================================
// RUTAS ADMIN (Requieren rol de administrador)
// ========================================

/**
 * @route GET /api/auth/users
 * @desc Listar todos los usuarios (solo admin)
 * @access Admin
 */
router.get('/users', validarJWT, roleMiddleware('admin'), authController.listarUsuarios);

/**
 * @route GET /api/auth/users/:id
 * @desc Obtener usuario por ID (solo admin)
 * @access Admin
 */
router.get('/users/:id', validarJWT, roleMiddleware('admin'), authController.obtenerUsuarioPorId);

/**
 * @route PUT /api/auth/users/:id
 * @desc Actualizar usuario (solo admin)
 * @access Admin
 */
router.put('/users/:id', validarJWT, roleMiddleware('admin'), authController.actualizarUsuario);

/**
 * @route PUT /api/auth/users/:id/toggle-status
 * @desc Activar/Desactivar usuario (solo admin)
 * @access Admin
 */
router.put('/users/:id/toggle-status', validarJWT, roleMiddleware('admin'), authController.toggleStatusUsuario);

/**
 * @route PUT /api/auth/users/:id/unlock
 * @desc Desbloquear usuario (solo admin)
 * @access Admin
 */
router.put('/users/:id/unlock', validarJWT, roleMiddleware('admin'), authController.desbloquearUsuario);

/**
 * @route DELETE /api/auth/users/:id
 * @desc Eliminar usuario (solo admin)
 * @access Admin
 */
router.delete('/users/:id', validarJWT, roleMiddleware('admin'), authController.eliminarUsuario);

module.exports = router;