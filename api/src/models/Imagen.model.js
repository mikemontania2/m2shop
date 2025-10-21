const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

const Imagen = sequelize.define('Imagen', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING, // ejemplo: "portada", "galeria", "miniatura"
    allowNull: true
  },
  orden: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  referenciaTipo: {
    type: DataTypes.STRING, // ejemplo: "producto", "variante", "atributo"
    allowNull: false
  },
  referenciaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'imagenes',
  timestamps: true
});

module.exports = Imagen;
