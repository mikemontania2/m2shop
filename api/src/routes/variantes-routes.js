// ========== variante.routes.js ==========
const express = require('express');
const router = express.Router();
const varianteController = require('../controllers/variante.controller');

// Rutas de listado con paginación (8 items por página)
router.get('/destacados', varianteController.getDestacados);
router.get('/novedades', varianteController.getNovedades);
router.get('/categoria/:slug', varianteController.getByCategoria);
//router.get('/subcategoria/:slug', varianteController.getBySubcategoriaSlug);
//router.get('/search', varianteController.search);

// Ruta de detalle individual
//router.get('/:id', varianteController.getById);

module.exports = router;