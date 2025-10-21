const { Router } = require('express');
const metodoEnvioController = require('../controllers/MetodoEnvio.controller'); 
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware.mw');
const router = Router();
 


// Públicas
router.get('/metodos-envio', metodoEnvioController.listar);

// Admin
router.post('/metodos-envio', authMiddleware, roleMiddleware('admin'), metodoEnvioController.crear);
router.put('/metodos-envio/:id', authMiddleware, roleMiddleware('admin'), metodoEnvioController.actualizar);
router.delete('/metodos-envio/:id', authMiddleware, roleMiddleware('admin'), metodoEnvioController.eliminar);

module.exports = router;
