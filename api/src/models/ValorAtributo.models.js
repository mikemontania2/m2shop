const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const Atributo = require('./Atributo.models');

const ValorAtributo = sequelize.define('ValorAtributo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  atributoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  valor: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  propiedades: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Ejemplo: { "color": "#eb961e", "imagen": "url" }'
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'valores_atributos',
  timestamps: true,
  underscored: true
});

ValorAtributo.belongsTo(Atributo, { foreignKey: 'atributoId', as: 'atributo' });
Atributo.hasMany(ValorAtributo, { foreignKey: 'atributoId', as: 'valores' });

module.exports = ValorAtributo;
