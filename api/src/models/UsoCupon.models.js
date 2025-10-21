const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const Pedido = require('./Pedido.models');
const Usuario = require('./Usuario.models');
const Cupon = require('./Cupon.models');
const UsoCupon = sequelize.define('UsoCupon', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cuponId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pedidoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  montoDescuento: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'uso_cupones',
  timestamps: true,
  underscored: true
});
 UsoCupon.belongsTo(Cupon , { foreignKey: 'cuponId' });
UsoCupon.belongsTo(Usuario, { foreignKey: 'usuarioId' });
UsoCupon.belongsTo(Pedido, { foreignKey: 'pedidoId' });
module.exports = UsoCupon;
