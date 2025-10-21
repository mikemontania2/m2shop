const { Op } = require("sequelize")
const ValorAtributo = require("../models/ValorAtributo.models")
const Atributo = require("../models/Atributo.models")
const VarianteAtributo = require("../models/VarianteAtributo.models")

// Crear un nuevo valor de atributo
const agregar = async (req, res) => {
  try {
    const valorAtributo = await ValorAtributo.create(req.body)
    res.status(201).json({ mensaje: "Valor de atributo creado exitosamente", valorAtributo })
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear valor de atributo", error: error.message })
  }
}

// Listar valores de un atributo específico
const listarPorAtributo = async (req, res) => {
  try {
    const { atributoId } = req.params

    const valores = await ValorAtributo.findAll({
      where: { atributoId },
      include: [
        {
          model: Atributo,
          as: "atributo",
          attributes: ["id", "nombre", "tipo"],
        },
      ],
      order: [["valor", "ASC"]],
    })

    res.json(valores)
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar valores", error: error.message })
  }
}

// Listar todos los valores de atributos
const listar = async (req, res) => {
  try {
    const valores = await ValorAtributo.findAll({
      include: [
        {
          model: Atributo,
          as: "atributo",
          attributes: ["id", "nombre", "tipo"],
        },
      ],
      order: [
        [{ model: Atributo, as: "atributo" }, "nombre", "ASC"],
        ["valor", "ASC"],
      ],
    })

    res.json(valores)
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar valores", error: error.message })
  }
}

// Obtener un valor por ID
const obtenerPorId = async (req, res) => {
  try {
    const { id } = req.params

    const valor = await ValorAtributo.findByPk(id, {
      include: [
        {
          model: Atributo,
          as: "atributo",
          attributes: ["id", "nombre", "tipo"],
        },
      ],
    })

    if (!valor) {
      return res.status(404).json({ mensaje: "Valor de atributo no encontrado" })
    }

    res.json(valor)
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener valor", error: error.message })
  }
}

// Actualizar valor de atributo
const actualizar = async (req, res) => {
  try {
    const { id } = req.params
    const [updated] = await ValorAtributo.update(req.body, { where: { id } })

    if (!updated) {
      return res.status(404).json({ mensaje: "Valor de atributo no encontrado" })
    }

    const valorActualizado = await ValorAtributo.findByPk(id, {
      include: [
        {
          model: Atributo,
          as: "atributo",
        },
      ],
    })

    res.json({ mensaje: "Valor actualizado exitosamente", valorAtributo: valorActualizado })
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar valor", error: error.message })
  }
}

// Eliminar valor de atributo
const eliminar = async (req, res) => {
  try {
    const { id } = req.params

    // Verificar si está siendo usado en variantes
    const variantesCount = await VarianteAtributo.count({ where: { valorAtributoId: id } })

    if (variantesCount > 0) {
      return res.status(400).json({
        mensaje: "No se puede eliminar el valor porque está siendo usado en variantes",
      })
    }

    const deleted = await ValorAtributo.destroy({ where: { id } })

    if (!deleted) {
      return res.status(404).json({ mensaje: "Valor de atributo no encontrado" })
    }

    res.json({ mensaje: "Valor eliminado exitosamente" })
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar valor", error: error.message })
  }
}

module.exports = {
  agregar,
  listar,
  listarPorAtributo,
  obtenerPorId,
  actualizar,
  eliminar,
}
