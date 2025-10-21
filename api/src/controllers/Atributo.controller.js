const { Op } = require("sequelize")
const VarianteAtributo = require("../models/VarianteAtributo.models")
const Variante = require("../models/Variante.models")
const ValorAtributo = require("../models/ValorAtributo.models")
const Atributo = require("../models/Atributo.models")

// Asignar atributos a una variante
const asignarAtributos = async (req, res) => {
  try {
    const { varianteId, atributos } = req.body // atributos: [{ valorAtributoId: 1 }, { valorAtributoId: 2 }]

    // Verificar que la variante existe
    const variante = await Variante.findByPk(varianteId)
    if (!variante) {
      return res.status(404).json({ mensaje: "Variante no encontrada" })
    }

    // Eliminar atributos existentes de la variante
    await VarianteAtributo.destroy({ where: { varianteId } })

    // Crear nuevas asignaciones
    const asignaciones = await VarianteAtributo.bulkCreate(
      atributos.map((attr) => ({
        varianteId,
        valorAtributoId: attr.valorAtributoId,
      })),
    )

    res.status(201).json({
      mensaje: "Atributos asignados exitosamente",
      asignaciones,
    })
  } catch (error) {
    res.status(500).json({ mensaje: "Error al asignar atributos", error: error.message })
  }
}

// Listar atributos de una variante
const listarPorVariante = async (req, res) => {
  try {
    const { varianteId } = req.params

    const atributos = await VarianteAtributo.findAll({
      where: { varianteId },
      include: [
        {
          model: ValorAtributo,
          as: "valorAtributo",
          include: [
            {
              model: Atributo,
              as: "atributo",
              attributes: ["id", "nombre", "tipo"],
            },
          ],
        },
      ],
    })

    res.json(atributos)
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar atributos", error: error.message })
  }
}

// Eliminar un atributo específico de una variante
const eliminar = async (req, res) => {
  try {
    const { id } = req.params

    const deleted = await VarianteAtributo.destroy({ where: { id } })

    if (!deleted) {
      return res.status(404).json({ mensaje: "Asignación no encontrada" })
    }

    res.json({ mensaje: "Atributo eliminado de la variante exitosamente" })
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar atributo", error: error.message })
  }
}

// Eliminar todos los atributos de una variante
const eliminarPorVariante = async (req, res) => {
  try {
    const { varianteId } = req.params

    const deleted = await VarianteAtributo.destroy({ where: { varianteId } })

    res.json({
      mensaje: "Atributos eliminados de la variante exitosamente",
      cantidad: deleted,
    })
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar atributos", error: error.message })
  }
}

module.exports = {
  asignarAtributos,
  listarPorVariante,
  eliminar,
  eliminarPorVariante,
}
