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

const crear = async (req, res) => {
  try {
    const productoData = req.body
    const producto = await Producto.create(productoData)

    res.status(201).json({ mensaje: "Producto creado exitosamente", producto })
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear producto", error: error.message })
  }
}

const listar = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      categoriaId,
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

    if (categoriaId) where.categoriaId = categoriaId
    if (buscar) {
      where[Op.or] = [{ nombre: { [Op.like]: `%${buscar}%` } }, { descripcion: { [Op.like]: `%${buscar}%` } }]
    }

    const varianteWhere = { activo: true }
    if (destacado) varianteWhere.destacado = destacado === "true"
    if (nuevo) varianteWhere.nuevo = nuevo === "true"
    if (precioMin || precioMax) {
      varianteWhere.precio = {}
      if (precioMin) varianteWhere.precio[Op.gte] = precioMin
      if (precioMax) varianteWhere.precio[Op.lte] = precioMax
    }

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
          required: Object.keys(varianteWhere).length > 1, // Solo requerido si hay filtros
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
      distinct: true, // Evitar duplicados por las relaciones hasMany
    })

    res.json({
      total: count,
      paginas: Math.ceil(count / limit),
      paginaActual: Number.parseInt(page),
      productos: rows,
    })
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar productos", error: error.message })
  }
}

const obtenerPorSlug = async (req, res) => {
  try {
    const { slug } = req.params

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
                  attributes: ["id", "valor", "propiedades"],
                  include: [
                    {
                      model: Atributo,
                      as: "atributo",
                      attributes: ["id", "nombre", "orden"],
                    },
                  ],
                },
              ],
              order: [["orden", "ASC"]],
            },
            {
              model: Descuento,
              where: {
                activo: true,
                fechaDesde: { [Op.lte]: new Date() },
                fechaHasta: { [Op.gte]: new Date() },
              },
              required: false,
            },
          ],
        },
      ],
    })

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" })
    }

    res.json(producto)
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener producto", error: error.message })
  }
}

const actualizar = async (req, res) => {
  try {
    const { id } = req.params
    const productoData = req.body

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
    res.status(500).json({ mensaje: "Error al actualizar producto", error: error.message })
  }
}

const eliminar = async (req, res) => {
  try {
    const { id } = req.params

    const [updated] = await Producto.update({ activo: false }, { where: { id } })

    if (!updated) {
      return res.status(404).json({ mensaje: "Producto no encontrado" })
    }

    res.json({ mensaje: "Producto eliminado" })
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar producto", error: error.message })
  }
}

module.exports = {
  crear,
  listar,
  obtenerPorSlug,
  actualizar,
  eliminar,
}
