const { Router } = require('express');
const cuponController = require('../controllers/Cupon.controller'); 
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware.mw');
const router = Router();
// Cliente
router.get('/cupones/validar/:codigo', authMiddleware, cuponController.validar);

// Admin
router.get('/cupones', authMiddleware, roleMiddleware('admin'), cuponController.listar);
router.post('/cupones', authMiddleware, roleMiddleware('admin'), cuponController.crear);
router.put('/cupones/:id', authMiddleware, roleMiddleware('admin'), cuponController.actualizar);
router.delete('/cupones/:id', authMiddleware, roleMiddleware('admin'), cuponController.eliminar);

module.exports = router;
