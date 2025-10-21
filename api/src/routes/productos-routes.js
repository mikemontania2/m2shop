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

// Públicas
router.get("/", productoController.listar)
router.get("/:slug", productoController.obtenerPorSlug)

// Admin/Vendedor
router.post("/productos", authMiddleware, roleMiddleware("admin", "vendedor"), productoController.crear)
router.put("/productos/:id", authMiddleware, roleMiddleware("admin", "vendedor"), productoController.actualizar)
router.delete("/productos/:id", authMiddleware, roleMiddleware("admin", "vendedor"), productoController.eliminar)

// ============= RUTAS DE IMÁGENES DE PRODUCTOS =============

router.get("/productos/:productoId/imagenes", imagenProductoController.listarPorProducto)
router.post(
  "/productos/imagenes",
  authMiddleware,
  roleMiddleware("admin", "vendedor"),
  imagenProductoController.agregar,
)
router.put(
  "/productos/imagenes/:id",
  authMiddleware,
  roleMiddleware("admin", "vendedor"),
  imagenProductoController.actualizar,
)
router.delete(
  "/productos/imagenes/:id",
  authMiddleware,
  roleMiddleware("admin", "vendedor"),
  imagenProductoController.eliminar,
)

// ============= RUTAS DE VARIANTES DE PRODUCTOS =============

router.get("/productos/:productoId/variantes", varianteProductoController.listarPorProducto)
router.post(
  "/productos/variantes",
  authMiddleware,
  roleMiddleware("admin", "vendedor"),
  varianteProductoController.crear,
)
router.put(
  "/productos/variantes/:id",
  authMiddleware,
  roleMiddleware("admin", "vendedor"),
  varianteProductoController.actualizar,
)
router.delete(
  "/productos/variantes/:id",
  authMiddleware,
  roleMiddleware("admin", "vendedor"),
  varianteProductoController.eliminar,
)
router.patch(
  "/productos/variantes/:id/stock",
  authMiddleware,
  roleMiddleware("admin", "vendedor"),
  varianteProductoController.actualizarStock,
)

// ============= RUTAS DE ATRIBUTOS (GLOBALES) =============

// Públicas - Listar atributos y sus valores
/* router.get("/atributos", atributoController.listar)
router.get("/atributos/:id", atributoController.obtenerPorId) */

// Admin/Vendedor - CRUD de atributos
/* router.post("/atributos", authMiddleware, roleMiddleware("admin", "vendedor"), atributoController.crear)
router.put("/atributos/:id", authMiddleware, roleMiddleware("admin", "vendedor"), atributoController.actualizar)
router.delete("/atributos/:id", authMiddleware, roleMiddleware("admin", "vendedor"), atributoController.eliminar) */

// ============= RUTAS DE VALORES DE ATRIBUTOS =============

// Públicas - Listar valores de un atributo
/* router.get("/atributos/:atributoId/valores", valorAtributoController.listarPorAtributo)

 router.post("/atributos/valores", authMiddleware, roleMiddleware("admin", "vendedor"), valorAtributoController.crear)
router.put(
  "/atributos/valores/:id",
  authMiddleware,
  roleMiddleware("admin", "vendedor"),
  valorAtributoController.actualizar,
)
router.delete(
  "/atributos/valores/:id",
  authMiddleware,
  roleMiddleware("admin", "vendedor"),
  valorAtributoController.eliminar,
)

// ============= RUTAS DE ATRIBUTOS DE VARIANTES =============

 router.get("/variantes/:varianteId/atributos", varianteAtributoController.listarPorVariante)

 router.post(
  "/variantes/atributos",
  authMiddleware,
  roleMiddleware("admin", "vendedor"),
  varianteAtributoController.asignar,
)
router.delete(
  "/variantes/atributos/:id",
  authMiddleware,
  roleMiddleware("admin", "vendedor"),
  varianteAtributoController.eliminar,
) */

module.exports = router
