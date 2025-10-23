const { Op } = require("sequelize") 

const Categoria = require("../models/Categoria.models")
const  Producto   = require('../models/Producto.models');
const  Variante   = require('../models/Variante.models');
 

const crear = async (req, res) => {
  try {
    const categoria = await Categoria.create(req.body)
    res.status(201).json({ mensaje: "Categoría creada", categoria })
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear categoría", error: error.message })
  }
}
const listar = async (req, res) => {
  try {
    // 1️⃣ Traemos las categorías principales
    const categorias = await Categoria.findAll({
      where: { activo: true, categoriasPadreId: null },
      order: [["orden", "ASC"]],
      raw: true,
    });

    // 2️⃣ Traemos todas las subcategorías activas
    const subcategorias = await Categoria.findAll({
      where: { activo: true, categoriasPadreId: { [Op.not]: null } },
      raw: true,
    });

    // 3️⃣ Traemos los productos con sus variantes
    const productos = await Producto.findAll({
      where: { activo: true },
      attributes: ["id", "categoriaId", "subcategoriaId"],
      include: [
        {
          model: Variante,
          as: "variantes",
          attributes: ["id"],
          where: { activo: true },
          required: false,
        },
      ],
    });

    // 4️⃣ Calculamos los conteos
    const conteoPorCategoria = {};
    const conteoPorSubcategoria = {};

    productos.forEach((p) => {
      const variantesCount = p.variantes?.length || 0;
      if (p.categoriaId) {
        conteoPorCategoria[p.categoriaId] =
          (conteoPorCategoria[p.categoriaId] || 0) + variantesCount;
      }
      if (p.subcategoriaId) {
        conteoPorSubcategoria[p.subcategoriaId] =
          (conteoPorSubcategoria[p.subcategoriaId] || 0) + variantesCount;
      }
    });

    // 5️⃣ Armamos el resultado final
    const resultado = categorias.map((cat) => {
      const subs = subcategorias.filter(
        (s) => s.categoriasPadreId === cat.id
      );
      return {
        id: cat.slug,
        name: cat.nombre,
        description: cat.descripcion || "",
        image: cat.imagenUrl || "",
        bannerUrl: cat.bannerUrl || "",
        count: conteoPorCategoria[cat.id] || 0,
        subcategories: subs.map((sub) => ({
          id: sub.slug,
          name: sub.nombre,
          description: sub.descripcion || "",
          count: conteoPorSubcategoria[sub.id] || 0,
        })),
      };
    });

    res.json(resultado);
  } catch (error) {
    console.error("Error al listar categorías:", error);
    res.status(500).json({
      message: "Error al listar categorías",
      error: error.message,
    });
  }
};





const obtenerPorSlug = async (req, res) => {
  try {
    const { slug } = req.params

    const categoria = await Categoria.findOne({
      where: { slug, activo: true },
      include: [
        {
          model: Categoria,
          as: "CategoriaPadre",
          attributes: ["id", "nombre", "slug"],
        },
        {
          model: Categoria,
          as: "subcategorias",
          where: { activo: true },
          required: false,
          attributes: ["id", "nombre", "slug", "descripcion", "imagenUrl", "orden"],
        },
      ],
    })

    if (!categoria) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" })
    }

    res.json(categoria)
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener categoría", error: error.message })
  }
}

const actualizar = async (req, res) => {
  try {
    const { id } = req.params
    const [updated] = await Categoria.update(req.body, { where: { id } })

    if (!updated) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" })
    }

    const categoriaActualizada = await Categoria.findByPk(id)
    res.json({ mensaje: "Categoría actualizada", categoria: categoriaActualizada })
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar categoría", error: error.message })
  }
}

const eliminar = async (req, res) => {
  try {
    const { id } = req.params
    const [updated] = await Categoria.update({ activo: false }, { where: { id } })

    if (!updated) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" })
    }

    res.json({ mensaje: "Categoría eliminada" })
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar categoría", error: error.message })
  }
}

module.exports = {
  crear,
  eliminar,
  actualizar,
  obtenerPorSlug,
  listar,
}
