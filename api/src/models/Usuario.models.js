const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  // NUEVO: Dirección completa
  direccion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // NUEVO: Tipo de documento
  tipoDocumento: {
    type: DataTypes.ENUM('ci', 'ruc', 'ninguno'),
    allowNull: false,
    defaultValue: 'ninguno',
    field: 'tipo_documento'
  },
  // Campo existente documento mantiene su uso
  documento: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  fechaNacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  rol: {
    type: DataTypes.ENUM('cliente', 'admin', 'vendedor'),
    defaultValue: 'cliente'
  },
  emailVerificado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'usuarios',
  timestamps: true,
  underscored: true
});
 
module.exports = Usuario;