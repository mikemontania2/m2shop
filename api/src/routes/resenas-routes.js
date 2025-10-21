const { Router } = require('express');
const resenaController = require('../controllers/Resena.controller'); 
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware.mw');
const router = Router();



// Públicas
router.get('/productos/:productoId/resenas', resenaController.listarPorProducto);

// Cliente
router.post('/resenas', authMiddleware, resenaController.crear);
router.delete('/resenas/:id', authMiddleware, resenaController.eliminar);

// Admin/Vendedor
router.get('/resenas/pendientes', authMiddleware, roleMiddleware('admin', 'vendedor'), resenaController.listarPendientes);
router.patch('/resenas/:id/aprobar', authMiddleware, roleMiddleware('admin', 'vendedor'), resenaController.aprobar);

module.exports = router;
