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
router.get("/destacados", productoController.obtenerDestacados)
router.get("/nuevos", productoController.obtenerNuevos)
router.get("/categoria/:categoriaSlug", productoController.obtenerPorCategoria)
router.get("/subcategoria/:subcategoriaSlug", productoController.obtenerPorSubcategoria)
router.get("/:slug", productoController.obtenerPorSlug)

// Admin/Vendedor
router.post("/productos", authMiddleware, roleMiddleware("admin", "vendedor"), productoController.crear)
router.put("/productos/:id", authMiddleware, roleMiddleware("admin", "vendedor"), productoController.actualizar)
router.delete("/productos/:id", authMiddleware, roleMiddleware("admin", "vendedor"), productoController.eliminar)
 
module.exports = router
