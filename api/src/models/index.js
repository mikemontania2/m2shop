const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');

const defineCategory = require('./models.category');
const defineProduct = require('./models.product');
const defineCustomer = require('./models.customer');
const defineOrder = require('./models.order');
const defineOrderItem = require('./models.orderItem');
const defineDiscount = require('./models.discount');

// Definición
const Category = defineCategory(sequelize, DataTypes);
const Product = defineProduct(sequelize, DataTypes);
const Customer = defineCustomer(sequelize, DataTypes);
const Order = defineOrder(sequelize, DataTypes);
const OrderItem = defineOrderItem(sequelize, DataTypes);
const Discount = defineDiscount(sequelize, DataTypes);

// Asociaciones
// FK explícita en snake_case para alinear con frontend
Category.hasMany(Product, { foreignKey: { name: 'category_id', allowNull: false }, onDelete: 'RESTRICT' });
Product.belongsTo(Category, { foreignKey: { name: 'category_id', allowNull: false } });

Customer.hasMany(Order, { foreignKey: { name: 'customer_id', allowNull: true }, onDelete: 'SET NULL' });
Order.belongsTo(Customer, { foreignKey: { name: 'customer_id', allowNull: true } });

Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'order_id', otherKey: 'product_id' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'product_id', otherKey: 'order_id' });

module.exports = {
  sequelize,
  Category,
  Product,
  Customer,
  Order,
  OrderItem,
  Discount,
};
