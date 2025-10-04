module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define('Discount', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.ENUM('AMOUNT', 'PRODUCT'), allowNull: false },
    sku_from: { type: DataTypes.INTEGER, allowNull: true },
    sku_to: { type: DataTypes.INTEGER, allowNull: true },
    qty_from: { type: DataTypes.INTEGER, allowNull: true },
    qty_to: { type: DataTypes.INTEGER, allowNull: true },
    value: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    start_date: { type: DataTypes.DATEONLY, allowNull: false },
    end_date: { type: DataTypes.DATEONLY, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: true },
  }, {
    tableName: 'discounts',
    timestamps: true,
    underscored: true,
  });
  return Discount;
};
