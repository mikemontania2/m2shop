const { Op } = require('sequelize');
const Cupon = require('../models/Cupon.models');
const { sequelize } = require('../../dbconfig');


const crear= async (req, res) => {
    try {
      const cupon = await Cupon.create(req.body);
      res.status(201).json({ mensaje: 'Cupón creado', cupon });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al crear cupón', error: error.message });
    }
  };

  const validar= async (req, res) => {
    try {
      const { codigo } = req.params;
      const { montoCompra } = req.query;
      const usuarioId = req.usuario.id;

      const cupon = await Cupon.findOne({
        where: {
          codigo,
          activo: true,
          fechaInicio: { [Op.lte]: new Date() },
          fechaFin: { [Op.gte]: new Date() }
        }
      });

      if (!cupon) {
        return res.status(404).json({ mensaje: 'Cupón no válido o expirado' });
      }

      // Verificar monto mínimo
      if (cupon.montoMinimo && parseFloat(montoCompra) < parseFloat(cupon.montoMinimo)) {
        return res.status(400).json({
          mensaje: `El monto mínimo para este cupón es ${cupon.montoMinimo}`
        });
      }

      // Verificar usos máximos
      if (cupon.usosMaximos && cupon.usosActuales >= cupon.usosMaximos) {
        return res.status(400).json({ mensaje: 'Cupón agotado' });
      }

      // Verificar usos por usuario
      const usosUsuario = await UsoCupon.count({
        where: { cuponId: cupon.id, usuarioId }
      });

      if (usosUsuario >= cupon.usosPorUsuario) {
        return res.status(400).json({ mensaje: 'Ya has usado este cupón el máximo de veces' });
      }

      // Calcular descuento
      let descuento = 0;
      const monto = parseFloat(montoCompra);
      
      if (cupon.tipoDescuento === 'porcentaje') {
        descuento = monto * (parseFloat(cupon.valor) / 100);
      } else {
        descuento = parseFloat(cupon.valor);
      }

      res.json({
        mensaje: 'Cupón válido',
        cupon: {
          codigo: cupon.codigo,
          descripcion: cupon.descripcion,
          tipoDescuento: cupon.tipoDescuento,
          valor: cupon.valor,
          descuento
        }
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al validar cupón', error: error.message });
    }
  }
 const  listar= async (req, res) => {
    try {
      const { activo, page = 1, limit = 20 } = req.query;
      const offset = (page - 1) * limit;

      const where = {};
      if (activo !== undefined) where.activo = activo === 'true';

      const { count, rows } = await Cupon.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
      });

      res.json({
        total: count,
        paginas: Math.ceil(count / limit),
        paginaActual: parseInt(page),
        cupones: rows
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al listar cupones', error: error.message });
    }
  }

  const obtenerPorId= async (req, res) => {
    try {
      const { id } = req.params;

      const cupon = await Cupon.findByPk(id);

      if (!cupon) {
        return res.status(404).json({ mensaje: 'Cupón no encontrado' });
      }

      res.json(cupon);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener cupón', error: error.message });
    }
  }
  const  actualizar= async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Cupon.update(req.body, { where: { id } });

      if (!updated) {
        return res.status(404).json({ mensaje: 'Cupón no encontrado' });
      }

      const cuponActualizado = await Cupon.findByPk(id);
      res.json({ mensaje: 'Cupón actualizado', cupon: cuponActualizado });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar cupón', error: error.message });
    }
  }
  const  eliminar= async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Cupon.update({ activo: false }, { where: { id } });

      if (!updated) {
        return res.status(404).json({ mensaje: 'Cupón no encontrado' });
      }

      res.json({ mensaje: 'Cupón desactivado' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar cupón', error: error.message });
    }
  }

module.exports = {
  crear,validar,listar,obtenerPorId,actualizar,eliminar
};
