const { Router } = require('express');
const estadisticasController = require('../controllers/Estadistica.controller'); 
const { authMiddleware, roleMiddleware, sessionMiddleware } = require('../middlewares/authMiddleware.mw');
const router = Router();
// Protegidas (usuario) o con sesión (anónimo) 
router.get('/estadisticas/dashboard', authMiddleware, roleMiddleware('admin', 'vendedor'), estadisticasController.obtenerDashboard);
router.get('/estadisticas/ventas', authMiddleware, roleMiddleware('admin', 'vendedor'), estadisticasController.reporteVentas);

module.exports = router;
