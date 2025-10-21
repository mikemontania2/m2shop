const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const Producto = require('./Producto.models');

/**
 * Modelo: Variante
 * Representa una versión específica de un producto (diferente presentación, color, tamaño, etc.).
 * Ejemplo: “Lavandina Concentrada 5000ml” o “Lavandina Extra 1L”.
 */
const Variante = sequelize.define('Variante', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  sku: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
 
  slug: {
    type: DataTypes.STRING(250),
    allowNull: false,
    unique: true
  },

  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Precio final (aplicando descuento si corresponde)'
  },

  precioOriginal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Precio antes del descuento'
  },

  imagenUrl: {
    type: DataTypes.STRING(255),
    allowNull: true
  },

  images: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Lista de URLs adicionales de imágenes'
  },

  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  destacado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  nuevo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },

  // 🔽 Campos eliminados o reubicados:
  // categoriaId y subcategoriaId → ahora se heredan del producto padre.
  // color, presentacion → ahora se gestionan mediante Atributos dinámicos.
  // descuento → se maneja mediante tabla Descuento relacionada por varianteId.
}, {
  tableName: 'variantes',
  timestamps: true,
  underscored: true
});

// Relaciones
Variante.belongsTo(Producto, { foreignKey: 'productoId', as: 'producto' });
Producto.hasMany(Variante, { foreignKey: 'productoId', as: 'variantes' });

module.exports = Variante;
