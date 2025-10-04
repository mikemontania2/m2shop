module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: { type: DataTypes.STRING(80), allowNull: false },
    lastName: { type: DataTypes.STRING(80), allowNull: false },
    email: { type: DataTypes.STRING(160), allowNull: false, unique: true },
    phone: { type: DataTypes.STRING(40) },
    password_hash: { type: DataTypes.STRING(200), allowNull: true },
  }, {
    tableName: 'customers',
    timestamps: true,
    underscored: true,
  });
  return Customer;
};
