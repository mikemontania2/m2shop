const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const Categoria = require('./Categoria.models');

/**
 * Modelo: Producto
 * Representa la información general que comparten todas las variantes.
 * Ejemplo: “Lavandina Concentrada” → todas sus variantes heredan descripción, usos, propiedades, etc.
 */
const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  nombre: {
    type: DataTypes.STRING(200),
    allowNull: false
  },

  slug: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true
  },

  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Descripción general del producto'
  },

  usosRecomendados: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Lista de usos recomendados del producto'
  },

  propiedades: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Características o beneficios destacados'
  },

  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  subcategoriaId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },

  // 🔽 Campos eliminados o trasladados (por rigidez o redundancia)
  // sku: se trasladó a Variante, ya que cada variante tiene un SKU único.
  // precio, precioComparacion, costo: también van en Variante.
  // stock, stockMinimo, peso: se manejan en las variantes.
  // destacado, nuevo: se mantienen en Variante (no todos los productos los requieren).
  // metaTitle, metaDescription: se pueden manejar en otra tabla o como metadatos SEO dinámicos.
}, {
  tableName: 'productos',
  timestamps: true,
  underscored: true
});

// Relaciones
Producto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
Categoria.hasMany(Producto, { foreignKey: 'categoriaId', as: 'productos' });

// Subcategoría: misma tabla Categoría, con alias distinto
Producto.belongsTo(Categoria, { foreignKey: 'subcategoriaId', as: 'subcategoria' });
Categoria.hasMany(Producto, { foreignKey: 'subcategoriaId', as: 'productosSubcategoria' });

module.exports = Producto;
