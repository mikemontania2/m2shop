module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    customer_name: { type: DataTypes.STRING(160) },
    customer_email: { type: DataTypes.STRING(160) },
    customer_phone: { type: DataTypes.STRING(40) },
    shipping_address: { type: DataTypes.STRING(500) },
    status: { type: DataTypes.ENUM('pending', 'paid', 'shipped', 'cancelled'), defaultValue: 'pending' },
    subtotal: { type: DataTypes.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
    importe_descuento: { type: DataTypes.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
    porcentaje_descuento: { type: DataTypes.DECIMAL(5,2), allowNull: false, defaultValue: 0 },
    importe_iva: { type: DataTypes.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
    total: { type: DataTypes.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
  }, {
    tableName: 'orders',
    timestamps: true,
    underscored: true,
  });
  return Order;
};
