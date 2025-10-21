const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const Pedido = require('./Pedido.models');
const Producto = require('./Producto.models');
const Variante = require('./Variante.models');
const ItemPedido = sequelize.define('ItemPedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pedidoId: {
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
  nombreProducto: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: 'Guardamos el nombre por si el producto se elimina'
  },
  sku: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precioUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'items_pedido',
  timestamps: true,
  underscored: true
});
 ItemPedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });
ItemPedido.belongsTo(Producto, { foreignKey: 'productoId' });
ItemPedido.belongsTo(Variante, { foreignKey: 'varianteId' });
module.exports = ItemPedido;
