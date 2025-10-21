
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const  Usuario  = require('./Usuario.models');
const  Barrio  = require('./Barrio.models');
const DireccionEnvio = sequelize.define('DireccionEnvio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombreCompleto: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  calle: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  numero: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  referencia: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  barrioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  codigoPostal: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  esPrincipal: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'direcciones_envio',
  timestamps: true,
  underscored: true
});
DireccionEnvio.belongsTo(Usuario, { foreignKey: 'usuarioId' });
DireccionEnvio.belongsTo(Barrio, { foreignKey: 'barrioId', targetKey: 'id' });

module.exports = DireccionEnvio;