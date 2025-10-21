const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const Pedido = require('./Pedido.models');
const Usuario = require('./Usuario.models');
const HistorialPedido = sequelize.define('HistorialPedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pedidoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Usuario que realizó el cambio'
  }
}, {
  tableName: 'historial_pedido',
  timestamps: true,
  underscored: true
});
 

HistorialPedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });
HistorialPedido.belongsTo(Usuario , { foreignKey: 'usuarioId' });
module.exports = HistorialPedido;
