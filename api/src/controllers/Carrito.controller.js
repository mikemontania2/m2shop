const { Op } = require('sequelize');
const Carrito = require('../models/Carrito.models');
const { sequelize } = require('../../dbconfig');


const obtener = async (req, res) => {
    try {
      const usuarioId = req.usuario?.id;
      const sessionId = req.sessionId;

      const where = usuarioId ? { usuarioId } : { sessionId };

      let carrito = await Carrito.findOne({
        where,
        include: [{
          model: ItemCarrito,
          include: [
            { model: Producto, include: [{ model: ImagenProducto, where: { esPrincipal: true }, required: false }] },
            { model: Variante }
          ]
        }]
      });

      if (!carrito) {
        carrito = await Carrito.create(where);
      }

      // Calcular totales
      let subtotal = 0;
      if (carrito.ItemCarritos) {
        carrito.ItemCarritos.forEach(item => {
          subtotal += parseFloat(item.precioUnitario) * item.cantidad;
        });
      }

      res.json({ 
        carrito, 
        subtotal, 
        cantidadItems: carrito.ItemCarritos?.length || 0 
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener carrito', error: error.message });
    }
  };
 const  agregarItem= async (req, res) => {
    try {
      const { productoId, varianteId, cantidad } = req.body;
      const usuarioId = req.usuario?.id;
      const sessionId = req.sessionId;

      // Obtener o crear carrito
      const where = usuarioId ? { usuarioId } : { sessionId };
      let carrito = await Carrito.findOne({ where });

      if (!carrito) {
        carrito = await Carrito.create(where);
      }

      // Verificar si el item ya existe
      const itemExistente = await ItemCarrito.findOne({
        where: { 
          carritoId: carrito.id, 
          productoId, 
          varianteId: varianteId || null 
        }
      });

      // Obtener precio del producto
      const producto = await Producto.findByPk(productoId);
      if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }

      let precioUnitario = parseFloat(producto.precio);

      if (varianteId) {
        const variante = await Variante.findByPk(varianteId);
        if (variante && variante.precio) {
          precioUnitario = parseFloat(variante.precio);
        }
      }

      if (itemExistente) {
        // Actualizar cantidad
        await ItemCarrito.update(
          { cantidad: itemExistente.cantidad + cantidad },
          { where: { id: itemExistente.id } }
        );
      } else {
        // Crear nuevo item
        await ItemCarrito.create({
          carritoId: carrito.id,
          productoId,
          varianteId,
          cantidad,
          precioUnitario
        });
      }

      // Obtener carrito actualizado
      const carritoActualizado = await Carrito.findByPk(carrito.id, {
        include: [{
          model: ItemCarrito, 
          include: [Producto, Variante]
        }]
      });

      res.json({ mensaje: 'Item agregado al carrito', carrito: carritoActualizado });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al agregar item', error: error.message });
    }
  }
const actualizarItem= async (req, res) => {
    try {
      const { itemId } = req.params;
      const { cantidad } = req.body;

      if (cantidad <= 0) {
        return res.status(400).json({ mensaje: 'La cantidad debe ser mayor a 0' });
      }

      const [updated] = await ItemCarrito.update({ cantidad }, { where: { id: itemId } });

      if (!updated) {
        return res.status(404).json({ mensaje: 'Item no encontrado' });
      }

      res.json({ mensaje: 'Cantidad actualizada' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar item', error: error.message });
    }
  }

   const eliminarItem= async (req, res) => {
    try {
      const { itemId } = req.params;

      const deleted = await ItemCarrito.destroy({ where: { id: itemId } });

      if (!deleted) {
        return res.status(404).json({ mensaje: 'Item no encontrado' });
      }

      res.json({ mensaje: 'Item eliminado del carrito' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar item', error: error.message });
    }
  }
  const vaciar= async (req, res) => {
    try {
      const usuarioId = req.usuario?.id;
      const sessionId = req.sessionId;

      const where = usuarioId ? { usuarioId } : { sessionId };
      const carrito = await Carrito.findOne({ where });

      if (carrito) {
        await ItemCarrito.destroy({ where: { carritoId: carrito.id } });
      }

      res.json({ mensaje: 'Carrito vaciado' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al vaciar carrito', error: error.message });
    }
  }
module.exports = {
  obtener,agregarItem,actualizarItem,eliminarItem,vaciar
};
