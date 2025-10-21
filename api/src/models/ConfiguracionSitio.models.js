
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
  const ConfiguracionSitio = sequelize.define('ConfiguracionSitio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clave: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  valor: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tipo: {
    type: DataTypes.ENUM('texto', 'numero', 'booleano', 'json'),
    defaultValue: 'texto'
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'configuracion_sitio',
  timestamps: true,
  underscored: true
});
module.exports = ConfiguracionSitio;