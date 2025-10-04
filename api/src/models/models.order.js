module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    customer_name: { type: DataTypes.STRING(160) },
    customer_email: { type: DataTypes.STRING(160) },
    customer_phone: { type: DataTypes.STRING(40) },
    shipping_address: { type: DataTypes.STRING(500) },
    status: { type: DataTypes.ENUM('pending', 'paid', 'shipped', 'cancelled'), defaultValue: 'pending' },
    total: { type: DataTypes.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
  }, {
    tableName: 'orders',
    timestamps: true,
    underscored: true,
  });
  return Order;
};
