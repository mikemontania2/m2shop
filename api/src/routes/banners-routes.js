const { Router } = require('express');
const bannerController = require('../controllers/Banner.controller'); 
const { authMiddleware, roleMiddleware, sessionMiddleware } = require('../middlewares/authMiddleware.mw');
const router = Router();
// Protegidas (usuario) o con sesión (anónimo)
router.get('/banners', authMiddleware, roleMiddleware('admin', 'vendedor'), bannerController.listarTodos);
router.get('/banners/:id', authMiddleware, roleMiddleware('admin', 'vendedor'), bannerController.obtenerPorId);
router.post('/banners', authMiddleware, roleMiddleware('admin', 'vendedor'), bannerController.crear);
router.put('/banners/:id', authMiddleware, roleMiddleware('admin', 'vendedor'), bannerController.actualizar);
router.patch('/banners/:id/toggle', authMiddleware, roleMiddleware('admin', 'vendedor'), bannerController.toggleActivo);
router.put('/banners/orden', authMiddleware, roleMiddleware('admin', 'vendedor'), bannerController.actualizarOrden);
router.delete('/banners/:id', authMiddleware, roleMiddleware('admin', 'vendedor'), bannerController.eliminar);


module.exports = router;
