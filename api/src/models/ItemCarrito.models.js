const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const Carrito = require('./Carrito.models');
const Producto = require('./Producto.models');
const Variante = require('./Variante.models');
const ItemCarrito = sequelize.define('ItemCarrito', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  carritoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  varianteId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  precioUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'items_carrito',
  timestamps: true,
  underscored: true
});
ItemCarrito.belongsTo(Carrito, { foreignKey: 'carritoId' });
ItemCarrito.belongsTo(Producto, { foreignKey: 'productoId' });
ItemCarrito.belongsTo(Variante, { foreignKey: 'varianteId' });
module.exports = ItemCarrito;
