// ========================================
// pedidos-routes.js - Rutas de Pedidos CORREGIDAS
// ========================================

const { Router } = require('express');
const pedidoController = require('../controllers/Pedido.controller');
const { 
  authMiddleware, 
  optionalAuthMiddleware, 
  roleMiddleware,
  auditMiddleware 
} = require('../middlewares/authMiddleware.mw');

const router = Router();

// ========================================
// RUTAS PÚBLICAS (Con sesión opcional)
// ========================================

/**
 * @route POST /api/pedidos/crear
 * @desc Crear pedido desde checkout (invitado o autenticado)
 * @access Private/Session
 * @body { cliente, items, total, metodoPago, shippingCost, notasCliente }
 */
router.post(
  '/crear',
  optionalAuthMiddleware,
  auditMiddleware('CREAR_PEDIDO'),
  pedidoController.crearPedido
);

/**
 * ✅ CAMBIO CRÍTICO: Permitir ver detalle del pedido con sessionId
 * @route GET /api/pedidos/:id
 * @desc Obtener detalle completo de un pedido
 * @access Private/Session (Usuario autenticado o invitado con sessionId)
 */
router.get(
  '/:id',
  optionalAuthMiddleware, // ✅ CAMBIO: De authMiddleware a optionalAuthMiddleware
  auditMiddleware('VER_DETALLE_PEDIDO'),
  pedidoController.obtenerPedido
);

// ========================================
// RUTAS PROTEGIDAS (Requieren autenticación)
// ========================================

/**
 * @route GET /api/pedidos/usuario/:usuarioId
 * @desc Obtener pedidos de un usuario específico
 * @access Private (Cliente puede ver sus propios pedidos, Admin puede ver todos)
 * @query { page, limit, estado }
 */
router.get(
  '/usuario/:usuarioId',
  authMiddleware,
  auditMiddleware('VER_PEDIDOS_USUARIO'),
  pedidoController.obtenerPedidosUsuario
);

// ========================================
// RUTAS DE ADMINISTRACIÓN
// ========================================

/**
 * @route GET /api/pedidos/admin/todos
 * @desc Obtener todos los pedidos del sistema
 * @access Admin only
 * @query { page, limit, estado, metodoPago, fechaDesde, fechaHasta, buscar }
 */
router.get(
  '/admin/todos',
  authMiddleware,
  roleMiddleware('admin', 'vendedor'),
  auditMiddleware('VER_TODOS_PEDIDOS'),
  pedidoController.obtenerTodosPedidos
);

/**
 * @route PUT /api/pedidos/:id/estado
 * @desc Actualizar estado de un pedido
 * @access Admin/Vendedor only
 * @body { estado, codigoSeguimiento?, notasInternas? }
 */
router.put(
  '/:id/estado',
  authMiddleware,
  roleMiddleware('admin', 'vendedor'),
  auditMiddleware('ACTUALIZAR_ESTADO_PEDIDO'),
  pedidoController.actualizarEstadoPedido
);

module.exports = router;