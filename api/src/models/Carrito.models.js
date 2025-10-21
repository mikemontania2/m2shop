const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const Usuario = require('./Usuario.models');

const Carrito = sequelize.define('Carrito', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  sessionId: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Para usuarios no autenticados'
  },
  expiraEn: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'carritos',
  timestamps: true,
  underscored: true
});
Carrito.belongsTo(Usuario, { foreignKey: 'usuarioId' });
module.exports = Carrito;
