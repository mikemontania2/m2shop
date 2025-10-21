const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const  Departamento  = require('./Departamento.models');
 const Ciudad = sequelize.define('Ciudad', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  departamentoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'ciudades',
  timestamps: false,
  underscored: true
});
Ciudad.belongsTo(Departamento, { foreignKey: 'departamentoId', targetKey: 'id' });

module.exports = Ciudad;