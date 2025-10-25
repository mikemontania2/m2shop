const DireccionEnvio = require('../models/DireccionEnvio.models');

const obtenerDirecciones = async (req, res) => {
  try {
    const direcciones = await DireccionEnvio.findAll({
      where: { usuarioId: req.usuario.id },
      order: [['createdAt', 'DESC']]
    });

    res.json({ direcciones });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener direcciones', error: error.message });
  }
};

const guardarDireccion = async (req, res) => {
  try {
    const { id, calle, numero, transversal, ciudad, barrio, referencia, latitud, longitud } = req.body;

    const [direccion, created] = await DireccionEnvio.upsert({
      id: id || `addr-${Date.now()}`,
      usuarioId: req.usuario.id,
      calle,
      numero,
      transversal,
      ciudad,
      barrio,
      referencia,
      latitud: latitud || -25.2969,
      longitud: longitud || -57.6244
    });

    res.json({
      mensaje: created ? 'Dirección creada' : 'Dirección actualizada',
      direccion
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar dirección', error: error.message });
  }
};

const eliminarDireccion = async (req, res) => {
  try {
    const { id } = req.params;

    const direccion = await DireccionEnvio.findOne({
      where: { id, usuarioId: req.usuario.id }
    });

    if (!direccion) {
      return res.status(404).json({ mensaje: 'Dirección no encontrada' });
    }

    await direccion.destroy();

    res.json({ mensaje: 'Dirección eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar dirección', error: error.message });
  }
};

module.exports = {
  obtenerDirecciones,
  guardarDireccion,
  eliminarDireccion
};