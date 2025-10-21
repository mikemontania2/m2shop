const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const Usuario = require('./Usuario.models');
const DireccionEnvio = require('./DireccionEnvio.models');
const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numeroPedido: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'confirmado', 'preparando', 'enviado', 'entregado', 'cancelado'),
    defaultValue: 'pendiente'
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  descuento: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  costoEnvio: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  metodoPago: {
    type: DataTypes.ENUM('efectivo', 'tarjeta', 'transferencia', 'paypal', 'otros'),
    allowNull: false
  },
  estadoPago: {
    type: DataTypes.ENUM('pendiente', 'pagado', 'rechazado', 'reembolsado'),
    defaultValue: 'pendiente'
  },
  direccionEnvioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  notasCliente: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  notasInternas: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fechaEstimadaEntrega: {
    type: DataTypes.DATE,
    allowNull: true
  },
  codigoSeguimiento: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'pedidos',
  timestamps: true,
  underscored: true
});
 Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Pedido.belongsTo(DireccionEnvio, { foreignKey: 'direccionEnvioId' });
module.exports = Pedido;
