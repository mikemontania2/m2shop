const { Router } = require('express');
const categoriaController = require('../controllers/Categoria.controller'); 
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware.mw');
const router = Router();


// Públicas
router.get('/', categoriaController.listar);
router.get('/:slug', categoriaController.obtenerPorSlug);

// Admin/Vendedor
router.post('/', authMiddleware, roleMiddleware('admin', 'vendedor'), categoriaController.crear);
router.put('/:id', authMiddleware, roleMiddleware('admin', 'vendedor'), categoriaController.actualizar);
router.delete('/:id', authMiddleware, roleMiddleware('admin', 'vendedor'), categoriaController.eliminar);

module.exports = router;
