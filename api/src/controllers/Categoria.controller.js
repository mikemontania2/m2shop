const { Op } = require("sequelize")
const Categoria = require("../models/Categoria.models")
const { sequelize } = require("../../dbconfig")

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
    // 🔹 Traemos todas las categorías y subcategorías
    const categorias = await Categoria.findAll({
      where: { activo: true },
      include: [
        {
          model: Categoria,
          as: 'subcategorias',
          where: { activo: true },
          required: false, // permite categorías sin subcategorías
        },
      ],
      order: [['orden', 'ASC']],
    });

    // 🔹 Filtramos solo las categorías principales (sin categoriasPadreId)
    const categoriasPadre = categorias.filter(c => !c.categoriasPadreId);

    // 🔹 Armamos el JSON de salida
    const resultado = categoriasPadre.map(cat => ({
      id: cat.slug,
      name: cat.nombre,
      description: cat.descripcion || '',
      image: cat.imagenUrl || '',
      subcategories: (cat.subcategorias || []).map(sub => ({
        id: sub.slug,
        name: sub.nombre,
        description: sub.descripcion || '',
      })),
    }));

    res.json(resultado);
  } catch (error) {
    console.error('Error al listar categorías:', error);
    res.status(500).json({ message: 'Error al listar categorías' });
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
