const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');

const Tarjeta = sequelize.define('Tarjeta', {
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'usuario_id',
    references: {
      model: 'usuarios',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  titular: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  ultimos4: {
    type: DataTypes.STRING(4),
    allowNull: false,
    field: 'ultimos_4'
  },
  marca: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  mesVencimiento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'mes_vencimiento',
    validate: {
      min: 1,
      max: 12
    }
  },
  anioVencimiento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'anio_vencimiento'
  }
}, {
  tableName: 'tarjetas',
  timestamps: true,
  underscored: true
});

module.exports = Tarjeta;