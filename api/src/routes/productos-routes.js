const { Router } = require("express")
const productoController = require("../controllers/Producto.controller")
const imagenProductoController = require("../controllers/imagenProducto.controller")
const varianteProductoController = require("../controllers/variante.controller")
const atributoController = require("../controllers/Atributo.controller")
const valorAtributoController = require("../controllers/ValorAtributo.controller")
const varianteAtributoController = require("../controllers/VarianteAtributo.controller")

const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware.mw")
const router = Router()

// ============= RUTAS DE PRODUCTOS =============
 
























/**
 * GET /api/variantes/destacados
 * Obtiene variantes destacadas para el carrusel de destacados
 * Query params: ?limit=12
 */
router.get('/destacados', productoController.getDestacados);

/**
 * GET /api/variantes/novedades
 * Obtiene las variantes más recientes para el carrusel de novedades
 * Query params: ?limit=12
 */
router.get('/novedades', productoController.getNovedades);

/**
 * GET /api/variantes/categoria/:categoriaId/home
 * Obtiene variantes de una categoría específica para el carrusel de categoría
 * Query params: ?limit=12
 */
router.get('/categoria/:categoriaId/home', productoController.getByCategoriaHome);

// ========== RUTAS PARA DETALLE Y BÚSQUEDA ==========

/**
 * GET /api/variantes/:id
 * Obtiene una variante por ID
 */
router.get('/:id', productoController.getById);

/**
 * GET /api/variantes/slug/:slug
 * Obtiene una variante por slug
 */
router.get('/slug/:slug', productoController.getBySlug);

/**
 * GET /api/variantes/producto/:productoId
 * Obtiene todas las variantes de un producto
 */
router.get('/producto/:productoId', productoController.getVariantesByProducto);










module.exports = router
