const { Op } = require('sequelize');
const ImagenProducto = require('../models/ImagenProducto.models');
const { sequelize } = require('../../dbconfig');
 
  // Agregar imagen a producto
  const agregar = async (req, res) => {
    try {
      const { productoId, url, esPrincipal, orden } = req.body;

      // Si es principal, desmarcar otras imágenes del producto
      if (esPrincipal) {
        await ImagenProducto.update(
          { esPrincipal: false },
          { where: { productoId } }
        );
      }

      const imagen = await ImagenProducto.create({
        productoId,
        url,
        esPrincipal: esPrincipal || false,
        orden: orden || 0
      });

      res.status(201).json({ mensaje: 'Imagen agregada', imagen });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al agregar imagen', error: error.message });
    }
  }

  // Listar imágenes de un producto
  const listarPorProducto = async (req, res) => {
    try {
      const { productoId } = req.params;

      const imagenes = await ImagenProducto.findAll({
        where: { productoId },
        order: [['orden', 'ASC'], ['esPrincipal', 'DESC']]
      });

      res.json(imagenes);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al listar imágenes', error: error.message });
    }
  }

  // Actualizar imagen
  const actualizar =  async (req, res) => {
    try {
      const { id } = req.params;
      const { esPrincipal, orden } = req.body;

      const imagen = await ImagenProducto.findByPk(id);
      if (!imagen) {
        return res.status(404).json({ mensaje: 'Imagen no encontrada' });
      }

      // Si se marca como principal, desmarcar otras
      if (esPrincipal) {
        await ImagenProducto.update(
          { esPrincipal: false },
          { where: { productoId: imagen.productoId, id: { [Op.ne]: id } } }
        );
      }

      await ImagenProducto.update({ esPrincipal, orden }, { where: { id } });

      const imagenActualizada = await ImagenProducto.findByPk(id);
      res.json({ mensaje: 'Imagen actualizada', imagen: imagenActualizada });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar imagen', error: error.message });
    }
  }

  // Eliminar imagen
 const eliminar = async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await ImagenProducto.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({ mensaje: 'Imagen no encontrada' });
      }

      res.json({ mensaje: 'Imagen eliminada' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar imagen', error: error.message });
    }
  }


 
module.exports = {
  agregar,listarPorProducto,actualizar,eliminar
};
