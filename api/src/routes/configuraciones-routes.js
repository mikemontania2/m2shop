const { Router } = require('express');
const configuracionController = require('../controllers/ConfiguracionSitio.controller'); 
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware.mw');
const router = Router();


// Públicas (solo algunas configuraciones públicas)
router.get('/configuracion', configuracionController.obtenerTodas);
router.get('/configuracion/:clave', configuracionController.obtenerPorClave);

// Admin
router.post('/configuracion', authMiddleware, roleMiddleware('admin'), configuracionController.crear);
router.put('/configuracion/:clave', authMiddleware, roleMiddleware('admin'), configuracionController.actualizar);


module.exports = router;
