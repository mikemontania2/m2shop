// ========== variante.routes.js ==========
const express = require('express');
const router = express.Router();
const varianteController = require('../controllers/variante.controller');
const varianteDetailController = require('../controllers/variante.detail.controller');

// Rutas de listado con paginación (8 items por página)
router.get('/buscar', varianteController.buscarProductos);
router.get('/destacados', varianteController.getDestacados);
router.get('/novedades', varianteController.getNovedades);
router.get('/categoria/:slug', varianteController.getByCategoria);


// Ruta de detalle individual (debe ir al final para no conflictuar)
// Acepta tanto ID como slug 
router.get('/:identificador', varianteDetailController.getVarianteDetail);

//router.get('/subcategoria/:slug', varianteController.getBySubcategoriaSlug);
//router.get('/search', varianteController.search);

// Ruta de detalle individual
//router.get('/:id', varianteController.getById);

module.exports = router;