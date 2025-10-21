const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const Producto = require('./Producto.models');
const Usuario = require('./Usuario.models');
const Pedido = require('./Pedido.models');
const Resena = sequelize.define('Resena', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pedidoId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  calificacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  titulo: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  aprobado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'resenas',
  timestamps: true,
  underscored: true
});
 Resena.belongsTo(Producto, { foreignKey: 'productoId' });
Resena.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Resena.belongsTo(Pedido, { foreignKey: 'pedidoId' });
module.exports = Resena;
