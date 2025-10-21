
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const  Pais  = require('./Pais.models');
const Departamento = sequelize.define('Departamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  paisId: {
    type: DataTypes.STRING(2),
    allowNull: false
  }
}, {
  tableName: 'departamentos',
  timestamps: false,
  underscored: true
});
Departamento.belongsTo(Pais, { foreignKey: 'paisId', targetKey: 'id' });

module.exports = Departamento;