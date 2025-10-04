module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    price: { type: DataTypes.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
  }, {
    tableName: 'order_items',
    timestamps: true,
    underscored: true,
  });
  return OrderItem;
};
