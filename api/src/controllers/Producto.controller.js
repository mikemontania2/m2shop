const { Op } = require("sequelize")
const Producto = require("../models/Producto.models")
const Categoria = require("../models/Categoria.models")
const Marca = require("../models/Marca.models")
const Variante = require("../models/Variante.models")
const VarianteAtributo = require("../models/VarianteAtributo.models")
const ValorAtributo = require("../models/ValorAtributo.models")
const Atributo = require("../models/Atributo.models")
const Descuento = require("../models/Descuento.models")
const { sequelize } = require("../../dbconfig")

/**
 * Genera el nombre de una variante concatenando el nombre del producto
 * con los valores de sus atributos ordenados
 */
const generarNombreVariante = (producto, atributos) => {
  if (!atributos || atributos.length === 0) {
    return producto.nombre
  }

  // Ordenar atributos por el orden del atributo y luego por el orden de la variante
  const atributosOrdenados = atributos.sort((a, b) => {
    const ordenAtributoA = a.valorAtributo?.atributo?.orden || 0
    const ordenAtributoB = b.valorAtributo?.atributo?.orden || 0
    if (ordenAtributoA !== ordenAtributoB) {
      return ordenAtributoA - ordenAtributoB
    }
    return (a.orden || 0) - (b.orden || 0)
  })

  // Concatenar nombre del producto con valores de atributos
  const partesNombre = [producto.nombre]
  atributosOrdenados.forEach((attr) => {
    if (attr.valorAtributo?.valor) {
      partesNombre.push(attr.valorAtributo.valor)
    }
  })

  return partesNombre.join(" ")
}

/**
 * Genera un slug a partir de un texto
 */
const generarSlug = (texto) => {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, "") // Eliminar caracteres especiales
    .trim()
    .replace(/\s+/g, "-") // Reemplazar espacios con guiones
    .replace(/-+/g, "-") // Eliminar guiones duplicados
}

/**
 * Transforma los datos del backend al formato esperado por el frontend
 */
const transformarVarianteParaFrontend = (variante, producto) => {
  const nombreCompleto = generarNombreVariante(producto, variante.atributos)

  // Generar slug si no existe
  let slug = variante.slug
  if (!slug || slug.trim() === "") {
    slug = generarSlug(nombreCompleto)
  }

  // Extraer sizes y colors de los atributos
  const sizes = []
  const colors = []

  if (variante.atributos) {
    variante.atributos.forEach((attr) => {
      const nombreAtributo = attr.valorAtributo?.atributo?.nombre?.toLowerCase()
      const valor = attr.valorAtributo?.valor

      if (nombreAtributo === "presentacion" || nombreAtributo === "presentación" || nombreAtributo === "tamaño") {
        if (valor && !sizes.includes(valor)) {
          sizes.push(valor)
        }
      } else if (nombreAtributo === "color") {
        if (valor && !colors.includes(valor)) {
          colors.push(valor)
        }
      }
    })
  }

  // Si no hay sizes o colors, agregar valores por defecto
  if (sizes.length === 0) sizes.push("Único")
  if (colors.length === 0) colors.push("Único")

  return {
    id: variante.id,
    name: nombreCompleto,
    slug: slug,
    category: producto.categoria?.slug || producto.categoria?.nombre || "",
    subcategory: producto.subcategoria?.slug || producto.subcategoria?.nombre || null,
    price: Number.parseFloat(variante.precio),
    originalPrice: variante.precioOriginal
      ? Number.parseFloat(variante.precioOriginal)
      : Number.parseFloat(variante.precio),
    image: variante.imagenUrl || "/placeholder.svg",
    images: variante.images || [variante.imagenUrl || "/placeholder.svg"],
    description: producto.descripcion || "",
    descripcion: producto.descripcion || "",
    propiedades: producto.propiedades || [],
    usosRecomendados: producto.usosRecomendados || [],
    sizes: sizes,
    colors: colors,
    featured: variante.destacado || false,
    nuevo: variante.nuevo || false,
    stock: variante.stock || 0,
    sku: variante.sku,
    // Datos adicionales que pueden ser útiles
    productoId: producto.id,
    varianteId: variante.id,
    categoryName: producto.categoria?.nombre || "",
    subcategoryName: producto.subcategoria?.nombre || null,
  }
}

/**
 * Listar productos con paginación y filtros
 * Retorna variantes transformadas al formato del frontend
 */
const listar = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      categoriaId,
      categoriaSlug,
      marcaId,
      destacado,
      nuevo,
      buscar,
      precioMin,
      precioMax,
      ordenar = "createdAt",
      orden = "DESC",
    } = req.query

    const offset = (page - 1) * limit
    const where = { activo: true }

    // Filtro por categoría
    if (categoriaId) {
      where.categoriaId = categoriaId
    } else if (categoriaSlug) {
      // Buscar categoría por slug
      const categoria = await Categoria.findOne({ where: { slug: categoriaSlug, activo: true } })
      if (categoria) {
        where.categoriaId = categoria.id
      }
    }

    // Filtro por búsqueda
    if (buscar) {
      where[Op.or] = [{ nombre: { [Op.like]: `%${buscar}%` } }, { descripcion: { [Op.like]: `%${buscar}%` } }]
    }

    // Filtros para variantes
    const varianteWhere = { activo: true }
    if (destacado !== undefined) varianteWhere.destacado = destacado === "true"
    if (nuevo !== undefined) varianteWhere.nuevo = nuevo === "true"
    if (precioMin || precioMax) {
      varianteWhere.precio = {}
      if (precioMin) varianteWhere.precio[Op.gte] = precioMin
      if (precioMax) varianteWhere.precio[Op.lte] = precioMax
    }

    // Obtener productos con sus variantes
    const { count, rows } = await Producto.findAndCountAll({
      where,
      include: [
        {
          model: Categoria,
          as: "categoria",
          attributes: ["id", "nombre", "slug"],
        },
        {
          model: Categoria,
          as: "subcategoria",
          attributes: ["id", "nombre", "slug"],
          required: false,
        },
        {
          model: Variante,
          as: "variantes",
          where: varianteWhere,
          required: true, // Solo productos con variantes activas
          include: [
            {
              model: VarianteAtributo,
              as: "atributos",
              include: [
                {
                  model: ValorAtributo,
                  as: "valorAtributo",
                  include: [
                    {
                      model: Atributo,
                      as: "atributo",
                      attributes: ["id", "nombre", "orden"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      limit: Number.parseInt(limit),
      offset: Number.parseInt(offset),
      order: [[ordenar, orden]],
      distinct: true,
    })

    // Transformar cada variante a formato frontend
    const productosTransformados = []
    rows.forEach((producto) => {
      if (producto.variantes && producto.variantes.length > 0) {
        producto.variantes.forEach((variante) => {
          const productoFrontend = transformarVarianteParaFrontend(variante, producto)
          productosTransformados.push(productoFrontend)
        })
      }
    })

    res.json({
      total: productosTransformados.length,
      totalProductos: count,
      paginas: Math.ceil(productosTransformados.length / limit),
      paginaActual: Number.parseInt(page),
      productos: productosTransformados,
    })
  } catch (error) {
    console.error("Error al listar productos:", error)
    res.status(500).json({ mensaje: "Error al listar productos", error: error.message })
  }
}

/**
 * Obtener un producto por slug
 * Retorna todas las variantes del producto transformadas
 */
const obtenerPorSlug = async (req, res) => {
  try {
    const { slug } = req.params

    // Buscar por slug de producto o variante
    const variante = await Variante.findOne({
      where: { slug, activo: true },
      include: [
        {
          model: Producto,
          as: "producto",
          include: [
            {
              model: Categoria,
              as: "categoria",
              attributes: ["id", "nombre", "slug"],
            },
            {
              model: Categoria,
              as: "subcategoria",
              attributes: ["id", "nombre", "slug"],
              required: false,
            },
          ],
        },
        {
          model: VarianteAtributo,
          as: "atributos",
          include: [
            {
              model: ValorAtributo,
              as: "valorAtributo",
              include: [
                {
                  model: Atributo,
                  as: "atributo",
                  attributes: ["id", "nombre", "orden"],
                },
              ],
            },
          ],
        },
      ],
    })

    if (!variante) {
      // Si no se encuentra por slug de variante, buscar por slug de producto
      const producto = await Producto.findOne({
        where: { slug, activo: true },
        include: [
          {
            model: Categoria,
            as: "categoria",
            attributes: ["id", "nombre", "slug"],
          },
          {
            model: Categoria,
            as: "subcategoria",
            attributes: ["id", "nombre", "slug"],
            required: false,
          },
          {
            model: Variante,
            as: "variantes",
            where: { activo: true },
            required: false,
            include: [
              {
                model: VarianteAtributo,
                as: "atributos",
                include: [
                  {
                    model: ValorAtributo,
                    as: "valorAtributo",
                    include: [
                      {
                        model: Atributo,
                        as: "atributo",
                        attributes: ["id", "nombre", "orden"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      })

      if (!producto || !producto.variantes || producto.variantes.length === 0) {
        return res.status(404).json({ mensaje: "Producto no encontrado" })
      }

      // Retornar la primera variante como principal y todas las variantes
      const variantePrincipal = transformarVarianteParaFrontend(producto.variantes[0], producto)
      const todasVariantes = producto.variantes.map((v) => transformarVarianteParaFrontend(v, producto))

      return res.json({
        ...variantePrincipal,
        variantes: todasVariantes,
      })
    }

    // Si se encontró la variante, retornarla transformada
    const productoTransformado = transformarVarianteParaFrontend(variante, variante.producto)

    // Obtener todas las variantes del mismo producto
    const todasVariantes = await Variante.findAll({
      where: { productoId: variante.producto.id, activo: true },
      include: [
        {
          model: VarianteAtributo,
          as: "atributos",
          include: [
            {
              model: ValorAtributo,
              as: "valorAtributo",
              include: [
                {
                  model: Atributo,
                  as: "atributo",
                  attributes: ["id", "nombre", "orden"],
                },
              ],
            },
          ],
        },
      ],
    })

    const variantesTransformadas = todasVariantes.map((v) => transformarVarianteParaFrontend(v, variante.producto))

    res.json({
      ...productoTransformado,
      variantes: variantesTransformadas,
    })
  } catch (error) {
    console.error("Error al obtener producto:", error)
    res.status(500).json({ mensaje: "Error al obtener producto", error: error.message })
  }
}

/**
 * Obtener productos destacados
 */
const obtenerDestacados = async (req, res) => {
  try {
    const { limit = 12 } = req.query

    const productos = await Producto.findAll({
      where: { activo: true },
      include: [
        {
          model: Categoria,
          as: "categoria",
          attributes: ["id", "nombre", "slug"],
        },
        {
          model: Categoria,
          as: "subcategoria",
          attributes: ["id", "nombre", "slug"],
          required: false,
        },
        {
          model: Variante,
          as: "variantes",
          where: { activo: true, destacado: true },
          required: true,
          include: [
            {
              model: VarianteAtributo,
              as: "atributos",
              include: [
                {
                  model: ValorAtributo,
                  as: "valorAtributo",
                  include: [
                    {
                      model: Atributo,
                      as: "atributo",
                      attributes: ["id", "nombre", "orden"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      limit: Number.parseInt(limit),
      order: [["createdAt", "DESC"]],
    })

    const productosTransformados = []
    productos.forEach((producto) => {
      if (producto.variantes && producto.variantes.length > 0) {
        producto.variantes.forEach((variante) => {
          const productoFrontend = transformarVarianteParaFrontend(variante, producto)
          productosTransformados.push(productoFrontend)
        })
      }
    })

    res.json(productosTransformados)
  } catch (error) {
    console.error("Error al obtener destacados:", error)
    res.status(500).json({ mensaje: "Error al obtener productos destacados", error: error.message })
  }
}

/**
 * Obtener productos nuevos
 */
const obtenerNuevos = async (req, res) => {
  try {
    const { limit = 12 } = req.query

    const productos = await Producto.findAll({
      where: { activo: true },
      include: [
        {
          model: Categoria,
          as: "categoria",
          attributes: ["id", "nombre", "slug"],
        },
        {
          model: Categoria,
          as: "subcategoria",
          attributes: ["id", "nombre", "slug"],
          required: false,
        },
        {
          model: Variante,
          as: "variantes",
          where: { activo: true, nuevo: true },
          required: true,
          include: [
            {
              model: VarianteAtributo,
              as: "atributos",
              include: [
                {
                  model: ValorAtributo,
                  as: "valorAtributo",
                  include: [
                    {
                      model: Atributo,
                      as: "atributo",
                      attributes: ["id", "nombre", "orden"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      limit: Number.parseInt(limit),
      order: [["createdAt", "DESC"]],
    })

    const productosTransformados = []
    productos.forEach((producto) => {
      if (producto.variantes && producto.variantes.length > 0) {
        producto.variantes.forEach((variante) => {
          const productoFrontend = transformarVarianteParaFrontend(variante, producto)
          productosTransformados.push(productoFrontend)
        })
      }
    })

    res.json(productosTransformados)
  } catch (error) {
    console.error("Error al obtener nuevos:", error)
    res.status(500).json({ mensaje: "Error al obtener productos nuevos", error: error.message })
  }
}

/**
 * Obtener productos por categoría
 */
const obtenerPorCategoria = async (req, res) => {
  try {
    const { categoriaSlug } = req.params
    const { limit = 12, page = 1 } = req.query

    const categoria = await Categoria.findOne({ where: { slug: categoriaSlug, activo: true } })
    if (!categoria) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" })
    }

    const offset = (page - 1) * limit

    const { count, rows } = await Producto.findAndCountAll({
      where: { categoriaId: categoria.id, activo: true },
      include: [
        {
          model: Categoria,
          as: "categoria",
          attributes: ["id", "nombre", "slug"],
        },
        {
          model: Categoria,
          as: "subcategoria",
          attributes: ["id", "nombre", "slug"],
          required: false,
        },
        {
          model: Variante,
          as: "variantes",
          where: { activo: true },
          required: true,
          include: [
            {
              model: VarianteAtributo,
              as: "atributos",
              include: [
                {
                  model: ValorAtributo,
                  as: "valorAtributo",
                  include: [
                    {
                      model: Atributo,
                      as: "atributo",
                      attributes: ["id", "nombre", "orden"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      limit: Number.parseInt(limit),
      offset: Number.parseInt(offset),
      order: [["createdAt", "DESC"]],
      distinct: true,
    })

    const productosTransformados = []
    rows.forEach((producto) => {
      if (producto.variantes && producto.variantes.length > 0) {
        producto.variantes.forEach((variante) => {
          const productoFrontend = transformarVarianteParaFrontend(variante, producto)
          productosTransformados.push(productoFrontend)
        })
      }
    })

    res.json({
      total: productosTransformados.length,
      totalProductos: count,
      paginas: Math.ceil(productosTransformados.length / limit),
      paginaActual: Number.parseInt(page),
      productos: productosTransformados,
      categoria: {
        id: categoria.id,
        nombre: categoria.nombre,
        slug: categoria.slug,
      },
    })
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error)
    res.status(500).json({ mensaje: "Error al obtener productos por categoría", error: error.message })
  }
}

/**
 * Obtener productos por subcategoría
 */
const obtenerPorSubcategoria = async (req, res) => {
  try {
    const { subcategoriaSlug } = req.params
    const { limit = 12, page = 1 } = req.query

    const subcategoria = await Categoria.findOne({ where: { slug: subcategoriaSlug, activo: true } })
    if (!subcategoria) {
      return res.status(404).json({ mensaje: "Subcategoría no encontrada" })
    }

    const offset = (page - 1) * limit

    const { count, rows } = await Producto.findAndCountAll({
      where: { subcategoriaId: subcategoria.id, activo: true },
      include: [
        {
          model: Categoria,
          as: "categoria",
          attributes: ["id", "nombre", "slug"],
        },
        {
          model: Categoria,
          as: "subcategoria",
          attributes: ["id", "nombre", "slug"],
          required: false,
        },
        {
          model: Variante,
          as: "variantes",
          where: { activo: true },
          required: true,
          include: [
            {
              model: VarianteAtributo,
              as: "atributos",
              include: [
                {
                  model: ValorAtributo,
                  as: "valorAtributo",
                  include: [
                    {
                      model: Atributo,
                      as: "atributo",
                      attributes: ["id", "nombre", "orden"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      limit: Number.parseInt(limit),
      offset: Number.parseInt(offset),
      order: [["createdAt", "DESC"]],
      distinct: true,
    })

    const productosTransformados = []
    rows.forEach((producto) => {
      if (producto.variantes && producto.variantes.length > 0) {
        producto.variantes.forEach((variante) => {
          const productoFrontend = transformarVarianteParaFrontend(variante, producto)
          productosTransformados.push(productoFrontend)
        })
      }
    })

    res.json({
      total: productosTransformados.length,
      totalProductos: count,
      paginas: Math.ceil(productosTransformados.length / limit),
      paginaActual: Number.parseInt(page),
      productos: productosTransformados,
      subcategoria: {
        id: subcategoria.id,
        nombre: subcategoria.nombre,
        slug: subcategoria.slug,
      },
    })
  } catch (error) {
    console.error("Error al obtener productos por subcategoría:", error)
    res.status(500).json({ mensaje: "Error al obtener productos por subcategoría", error: error.message })
  }
}

/**
 * Crear producto (admin)
 */
const crear = async (req, res) => {
  try {
    const productoData = req.body

    // Generar slug si no existe
    if (!productoData.slug) {
      productoData.slug = generarSlug(productoData.nombre)
    }

    const producto = await Producto.create(productoData)

    res.status(201).json({ mensaje: "Producto creado exitosamente", producto })
  } catch (error) {
    console.error("Error al crear producto:", error)
    res.status(500).json({ mensaje: "Error al crear producto", error: error.message })
  }
}

/**
 * Actualizar producto (admin)
 */
const actualizar = async (req, res) => {
  try {
    const { id } = req.params
    const productoData = req.body

    // Actualizar slug si cambió el nombre
    if (productoData.nombre && !productoData.slug) {
      productoData.slug = generarSlug(productoData.nombre)
    }

    const [updated] = await Producto.update(productoData, { where: { id } })

    if (!updated) {
      return res.status(404).json({ mensaje: "Producto no encontrado" })
    }

    const productoActualizado = await Producto.findByPk(id, {
      include: [
        { model: Categoria, as: "categoria" },
        { model: Categoria, as: "subcategoria", required: false },
        { model: Variante, as: "variantes" },
      ],
    })

    res.json({ mensaje: "Producto actualizado", producto: productoActualizado })
  } catch (error) {
    console.error("Error al actualizar producto:", error)
    res.status(500).json({ mensaje: "Error al actualizar producto", error: error.message })
  }
}

/**
 * Eliminar producto (soft delete)
 */
const eliminar = async (req, res) => {
  try {
    const { id } = req.params

    const [updated] = await Producto.update({ activo: false }, { where: { id } })

    if (!updated) {
      return res.status(404).json({ mensaje: "Producto no encontrado" })
    }

    res.json({ mensaje: "Producto eliminado" })
  } catch (error) {
    console.error("Error al eliminar producto:", error)
    res.status(500).json({ mensaje: "Error al eliminar producto", error: error.message })
  }
}

module.exports = {
  crear,
  listar,
  obtenerPorSlug,
  obtenerDestacados,
  obtenerNuevos,
  obtenerPorCategoria,
  obtenerPorSubcategoria,
  actualizar,
  eliminar,
}
