
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const  Ciudad  = require('./Ciudad.models');
 const Barrio = sequelize.define('Barrio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING(100),
    allowNull: false,
    set(value) {
      this.setDataValue('descripcion', value.toUpperCase());
    }
  },
  ciudadId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'barrios',
  timestamps: false,
  underscored: true
});
Barrio.belongsTo(Ciudad, { foreignKey: 'ciudadId', targetKey: 'id' });

module.exports = Barrio;