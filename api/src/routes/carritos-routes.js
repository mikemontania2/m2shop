// ========================================
// carrito-routes.js - Rutas del Carrito CORREGIDO
// ========================================

const { Router } = require('express');
const carritoController = require('../controllers/Carrito.controller');
const { optionalAuthMiddleware } = require('../middlewares/authMiddleware.mw');

const router = Router();

// ✅ USAR optionalAuthMiddleware en lugar de sessionMiddleware
// Este middleware:
// 1. Intenta autenticar si hay token
// 2. Si no hay token, usa sessionId
// 3. SIEMPRE configura req.usuario o req.sessionId

/**
 * @route GET /api/carrito
 * @desc Obtener carrito completo con recálculo automático
 * @access Private/Session
 */
router.get('/', optionalAuthMiddleware, carritoController.obtenerCarrito);
 
/**
 * @route POST /api/carrito/agregar
 * @desc Agregar producto al carrito
 * @access Private/Session
 * @body { varianteId: number, cantidad: number }
 */
router.post('/agregar', optionalAuthMiddleware, carritoController.agregarItem);

/**
 * @route PUT /api/carrito/item/:itemId
 * @desc Actualizar cantidad de un item
 * @access Private/Session
 * @body { cantidad: number }
 */
router.put('/item/:itemId', optionalAuthMiddleware, carritoController.actualizarCantidad);

/**
 * @route DELETE /api/carrito/item/:itemId
 * @desc Eliminar item del carrito
 * @access Private/Session
 */
router.delete('/item/:itemId', optionalAuthMiddleware, carritoController.eliminarItem);

/**
 * @route POST /api/carrito/vaciar
 * @desc Vaciar carrito completo
 * @access Private/Session
 */
router.post('/vaciar', optionalAuthMiddleware, carritoController.vaciarCarrito);

/**
 * @route POST /api/carrito/recalcular
 * @desc Forzar recálculo de precios y descuentos
 * @access Private/Session
 */
router.post('/recalcular', optionalAuthMiddleware, carritoController.recalcularCarrito);

module.exports = router;