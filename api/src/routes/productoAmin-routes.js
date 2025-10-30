 // ============================================
// productos-admin.routes.js
// Rutas exclusivas para administración de productos
// ============================================

const { Router } = require('express');
const productoAdminController = require('../controllers/ProductAdmin-controller');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware.mw');

const router = Router();

// ============================================
// TODAS LAS RUTAS REQUIEREN AUTENTICACIÓN Y ROL ADMIN
// ============================================
router.use(authMiddleware);
router.use(roleMiddleware('admin'));

// ============================================
// GESTIÓN DE PRODUCTOS
// ============================================

/**
 * GET /api/admin/productos
 * Obtener todos los productos con paginación y filtros
 * Query params: ?page=1&limit=20&search=lavandina&categoriaId=5
 */
router.get('/productos', productoAdminController.getAllProductos);

/**
 * GET /api/admin/productos/:id
 * Obtener un producto específico con todas sus relaciones
 */
router.get('/productos/:id', productoAdminController.getProductoById);

/**
 * POST /api/admin/productos
 * Crear un nuevo producto
 * Body: { nombre, slug, descripcion, usosRecomendados, propiedades, categoriaId, subcategoriaId, activo }
 */
router.post('/productos', productoAdminController.createProducto);

/**
 * PUT /api/admin/productos/:id
 * Actualizar un producto existente
 * Body: { nombre, slug, descripcion, usosRecomendados, propiedades, categoriaId, subcategoriaId, activo }
 */
router.put('/productos/:id', productoAdminController.updateProducto);

/**
 * DELETE /api/admin/productos/:id
 * Eliminar un producto y sus variantes
 */
router.delete('/productos/:id', productoAdminController.deleteProducto);

// ============================================
// GESTIÓN DE VARIANTES
// ============================================

/**
 * POST /api/admin/variantes
 * Crear una nueva variante
 * Body: { productoId, sku, nombre, slug, precio, imagenUrl, images, stock, destacado, nuevo, bloqueoDescuento, activo, atributos }
 */
router.post('/variantes', productoAdminController.createVariante);

/**
 * PUT /api/admin/variantes/:id
 * Actualizar una variante existente
 * Body: { sku, nombre, slug, precio, imagenUrl, images, stock, destacado, nuevo, bloqueoDescuento, activo, atributos }
 */
router.put('/variantes/:id', productoAdminController.updateVariante);

/**
 * DELETE /api/admin/variantes/:id
 * Eliminar una variante
 */
router.delete('/variantes/:id', productoAdminController.deleteVariante);

// ============================================
// GESTIÓN DE ATRIBUTOS
// ============================================

/**
 * GET /api/admin/atributos
 * Obtener todos los atributos con sus valores
 */
router.get('/atributos', productoAdminController.getAllAtributos);

/**
 * POST /api/admin/atributos
 * Crear un nuevo atributo
 * Body: { nombre, orden, activo }
 */
router.post('/atributos', productoAdminController.createAtributo);

/**
 * POST /api/admin/atributos/valores
 * Crear un nuevo valor para un atributo
 * Body: { atributoId, valor, propiedades, activo }
 */
router.post('/atributos/valores', productoAdminController.createValorAtributo);

module.exports = router;