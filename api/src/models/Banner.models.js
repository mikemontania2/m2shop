const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');

const Banner = sequelize.define('Banner', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  subtitulo: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  imagenUrl: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  imagenMobileUrl: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'Imagen optimizada para móvil (opcional)'
  },
  link: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'URL a donde redirige el banner al hacer clic'
  },
  textoBoton: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Texto del botón CTA (ej: "Comprar Ahora", "Ver Más")'
  },
  tipoBoton: {
    type: DataTypes.ENUM('primario', 'secundario', 'outline'),
    defaultValue: 'primario',
    comment: 'Estilo del botón'
  },
  posicionTexto: {
    type: DataTypes.ENUM('izquierda', 'centro', 'derecha'),
    defaultValue: 'centro',
    comment: 'Posición del texto en el banner'
  },
  colorTexto: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: '#FFFFFF',
    comment: 'Color del texto en hexadecimal'
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  orden: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Orden de aparición en el carrusel'
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Fecha de inicio de visualización (opcional)'
  },
  fechaFin: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Fecha de fin de visualización (opcional)'
  },
  tipoDispositivo: {
    type: DataTypes.ENUM('todos', 'desktop', 'mobile'),
    defaultValue: 'todos',
    comment: 'En qué dispositivos se muestra'
  }
}, {
  tableName: 'banners',
  timestamps: true,
  underscored: true
});


module.exports = Banner;