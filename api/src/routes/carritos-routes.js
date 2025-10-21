const { Router } = require('express');
const carritoController = require('../controllers/Carrito.controller'); 
const { authMiddleware, roleMiddleware, sessionMiddleware } = require('../middlewares/authMiddleware.mw');
const router = Router();
// Protegidas (usuario) o con sesión (anónimo)
router.get('/carrito', sessionMiddleware, carritoController.obtener);
router.post('/carrito/items', sessionMiddleware, carritoController.agregarItem);
router.put('/carrito/items/:itemId', sessionMiddleware, carritoController.actualizarItem);
router.delete('/carrito/items/:itemId', sessionMiddleware, carritoController.eliminarItem);
router.delete('/carrito', sessionMiddleware, carritoController.vaciar);

module.exports = router;
