const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const Pais = sequelize.define('Pais', {
  id: {
    type: DataTypes.STRING(2),
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'paises',
  timestamps: false,
  underscored: true
});
 
module.exports = Pais;
