const { Router } = require('express');
const ubicacionController = require('../controllers/Ubicacion.controller'); 
const { authMiddleware, roleMiddleware, sessionMiddleware } = require('../middlewares/authMiddleware.mw');
const router = Router();

// Públicas
router.get('/ubicacion/paises', ubicacionController.listarPaises);
router.get('/ubicacion/departamentos/:codigoPais', ubicacionController.listarDepartamentos);
router.get('/ubicacion/ciudades/:codigoDepartamento', ubicacionController.listarCiudades);
router.get('/ubicacion/barrios/:codigoCiudad', ubicacionController.listarBarrios);

module.exports = router;
