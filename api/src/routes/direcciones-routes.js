const { Router } = require('express');
const direccionEnvioController = require('../controllers/DireccionEnvio.controller'); 
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware.mw');
const router = Router();

router.get('/direcciones', authMiddleware, direccionEnvioController.listar);
router.post('/direcciones', authMiddleware, direccionEnvioController.crear);
router.put('/direcciones/:id', authMiddleware, direccionEnvioController.actualizar);
router.delete('/direcciones/:id', authMiddleware, direccionEnvioController.eliminar);
router.patch('/direcciones/:id/principal', authMiddleware, direccionEnvioController.marcarPrincipal);


module.exports = router;
