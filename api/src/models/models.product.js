module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(160), allowNull: false },
    slug: { type: DataTypes.STRING(180), allowNull: false, unique: true },
    description: { type: DataTypes.STRING(1000) },
    recommended_uses: { type: DataTypes.STRING(1000) },
    properties: { type: DataTypes.STRING(1000) },
    price: { type: DataTypes.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
    image_url: { type: DataTypes.STRING(500) },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_new: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  }, {
    tableName: 'products',
    timestamps: true,
    underscored: true,
  });
  return Product;
};
