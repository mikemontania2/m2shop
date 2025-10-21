const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const Producto = require('./Producto.models');
const ImagenProducto = sequelize.define('ImagenProducto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  esPrincipal: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  orden: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'imagenes_producto',
  timestamps: true,
  underscored: true
});
 ImagenProducto.belongsTo(Producto, { foreignKey: 'productoId' });

module.exports = ImagenProducto;
