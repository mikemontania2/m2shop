const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const Usuario = require('./Usuario.models');
const Producto = require('./Producto.models');
const ListaDeseos = sequelize.define('ListaDeseos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'lista_deseos',
  timestamps: true,
  underscored: true
});
 ListaDeseos.belongsTo(Usuario, { foreignKey: 'usuarioId' });
ListaDeseos.belongsTo(Producto, { foreignKey: 'productoId' });
module.exports = ListaDeseos;
