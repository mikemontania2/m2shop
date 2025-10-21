const { Router } = require('express');
const pedidoController = require('../controllers/Pedido.controller'); 
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware.mw');
const router = Router();
// Cliente

router.post('/pedidos', authMiddleware, pedidoController.crear);
router.get('/pedidos/mis-pedidos', authMiddleware, pedidoController.listarMisPedidos);
router.get('/pedidos/:id', authMiddleware, pedidoController.obtenerPorId);
// Admin/Vendedor
router.get('/pedidos', authMiddleware, roleMiddleware('admin', 'vendedor'), pedidoController.listarTodos);
router.patch('/pedidos/:id/estado', authMiddleware, roleMiddleware('admin', 'vendedor'), pedidoController.actualizarEstado);

module.exports = router;
