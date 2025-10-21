
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');

const MetodoEnvio = sequelize.define('MetodoEnvio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  costo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  costoGratis: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Monto mínimo para envío gratis'
  },
  tiempoEstimado: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Ej: 2-3 días hábiles'
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'metodos_envio',
  timestamps: true,
  underscored: true
});
module.exports = MetodoEnvio;