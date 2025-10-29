const { DataTypes } = require('sequelize')
const { sequelize } = require('../../dbconfig')
const Usuario = require('./Usuario.models')
const DireccionEnvio = sequelize.define(
  'DireccionEnvio',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    calle: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    numero: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    referencia: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    transversal: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lat: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lng: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    codigoPostal: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    departamento: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ciudad: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    barrio: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    esPrincipal: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    tableName: 'direcciones_envio',
    timestamps: true,
    underscored: true
  }
)
DireccionEnvio.belongsTo(Usuario, { foreignKey: 'usuarioId' })

module.exports = DireccionEnvio
