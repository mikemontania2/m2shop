const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const ValorAtributo = require('./ValorAtributo.models');
const Variante = require('./Variante.models');

const VarianteAtributo = sequelize.define('VarianteAtributo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  varianteId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  valorAtributoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  orden: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: 'Orden dentro de los atributos de una variante'
  }
}, {
  tableName: 'variantes_atributos',
  timestamps: true,
  underscored: true
});

VarianteAtributo.belongsTo(Variante, { foreignKey: 'varianteId', as: 'variante' });
VarianteAtributo.belongsTo(ValorAtributo, { foreignKey: 'valorAtributoId', as: 'valorAtributo' });

Variante.hasMany(VarianteAtributo, { foreignKey: 'varianteId', as: 'atributos' });
ValorAtributo.hasMany(VarianteAtributo, { foreignKey: 'valorAtributoId', as: 'variantes' });

module.exports = VarianteAtributo;
