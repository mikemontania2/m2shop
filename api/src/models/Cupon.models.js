
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');
const Cupon = sequelize.define('Cupon', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  codigo: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tipoDescuento: {
    type: DataTypes.ENUM('porcentaje', 'monto_fijo'),
    allowNull: false
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  montoMinimo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  usosPorUsuario: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  usosMaximos: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  usosActuales: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fechaFin: {
    type: DataTypes.DATE,
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'cupones',
  timestamps: true,
  underscored: true
});
module.exports = Cupon;