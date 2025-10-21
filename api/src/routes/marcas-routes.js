const { Router } = require('express');
const marcaController = require('../controllers/Marca.controller'); 
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware.mw');
const router = Router();
// Públicas
router.get('/marcas', marcaController.listar);
router.get('/marcas/:slug', marcaController.obtenerPorSlug);

// Admin/Vendedor
router.post('/marcas', authMiddleware, roleMiddleware('admin', 'vendedor'), marcaController.crear);
router.put('/marcas/:id', authMiddleware, roleMiddleware('admin', 'vendedor'), marcaController.actualizar);
router.delete('/marcas/:id', authMiddleware, roleMiddleware('admin', 'vendedor'), marcaController.eliminar);

module.exports = router;
