
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  imagenUrl: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  categoriasPadreId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  orden: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'categorias',
  timestamps: true,
  underscored: true
});
Categoria.belongsTo(Categoria, { as: 'CategoriaPadre', foreignKey: 'categoriasPadreId' }); 
module.exports = Categoria;