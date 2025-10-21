const { Router } = require('express');
const listaDeseosController = require('../controllers/ListaDeseos.controller'); 
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware.mw');
const router = Router();

router.get('/lista-deseos', authMiddleware, listaDeseosController.obtener);
router.post('/lista-deseos', authMiddleware, listaDeseosController.agregar);
router.delete('/lista-deseos/:id', authMiddleware, listaDeseosController.eliminar);
router.delete('/lista-deseos/producto/:productoId', authMiddleware, listaDeseosController.eliminarPorProducto);

module.exports = router;
