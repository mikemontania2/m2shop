 /*const { DataTypes } = require('sequelize');
const { sequelize } = require('../../dbconfig');

// ============= USUARIOS Y AUTENTICACIÓN =============

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

// ============= DIRECCIONES =============

const Pais = sequelize.define('Pais', {
  codigo: {
    type: DataTypes.STRING(2),
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'paises',
  timestamps: false,
  underscored: true
});

const Departamento = sequelize.define('Departamento', {
  codigo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  codigoPais: {
    type: DataTypes.STRING(2),
    allowNull: false
  }
}, {
  tableName: 'departamentos',
  timestamps: false,
  underscored: true
});

const Ciudad = sequelize.define('Ciudad', {
  codigo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  codigoDepartamento: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'ciudades',
  timestamps: false,
  underscored: true
});

const Barrio = sequelize.define('Barrio', {
  codigo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING(100),
    allowNull: false,
    set(value) {
      this.setDataValue('descripcion', value.toUpperCase());
    }
  },
  codigoCiudad: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'barrios',
  timestamps: false,
  underscored: true
});

const DireccionEnvio = sequelize.define('DireccionEnvio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombreCompleto: {
    type: DataTypes.STRING(200),
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
  codigoBarrio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  codigoPostal: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  esPrincipal: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'direcciones_envio',
  timestamps: true,
  underscored: true
});

// ============= CATEGORÍAS Y PRODUCTOS =============

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  imagenUrl: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  categoriasPadreId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  orden: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'categorias',
  timestamps: true,
  underscored: true
});

const Marca = sequelize.define('Marca', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  logoUrl: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'marcas',
  timestamps: true,
  underscored: true
});

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sku: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  nombre: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true
  },
  descripcionCorta: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  descripcionLarga: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  precioComparacion: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  costo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  marcaId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  stockMinimo: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  peso: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true,
    comment: 'Peso en kg'
  },
  destacado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  nuevo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  metaTitle: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  metaDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'productos',
  timestamps: true,
  underscored: true
});

const ImagenProducto = sequelize.define('ImagenProducto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  esPrincipal: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  orden: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'imagenes_producto',
  timestamps: true,
  underscored: true
});

const Variante = sequelize.define('Variante', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sku: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Ej: Talla M - Color Rojo'
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'variantes_producto',
  timestamps: true,
  underscored: true
});

const AtributoProducto = sequelize.define('AtributoProducto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Ej: Color, Talla, Material'
  },
  valor: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'atributos_producto',
  timestamps: true,
  underscored: true
});

// ============= CARRITO =============

const Carrito = sequelize.define('Carrito', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  sessionId: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Para usuarios no autenticados'
  },
  expiraEn: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'carritos',
  timestamps: true,
  underscored: true
});

const ItemCarrito = sequelize.define('ItemCarrito', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  carritoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  varianteId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  precioUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'items_carrito',
  timestamps: true,
  underscored: true
});

// ============= PEDIDOS =============

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numeroPedido: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'confirmado', 'preparando', 'enviado', 'entregado', 'cancelado'),
    defaultValue: 'pendiente'
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  descuento: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  costoEnvio: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  metodoPago: {
    type: DataTypes.ENUM('efectivo', 'tarjeta', 'transferencia', 'paypal', 'otros'),
    allowNull: false
  },
  estadoPago: {
    type: DataTypes.ENUM('pendiente', 'pagado', 'rechazado', 'reembolsado'),
    defaultValue: 'pendiente'
  },
  direccionEnvioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  notasCliente: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  notasInternas: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fechaEstimadaEntrega: {
    type: DataTypes.DATE,
    allowNull: true
  },
  codigoSeguimiento: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'pedidos',
  timestamps: true,
  underscored: true
});

const ItemPedido = sequelize.define('ItemPedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pedidoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  varianteId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  nombreProducto: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: 'Guardamos el nombre por si el producto se elimina'
  },
  sku: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precioUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'items_pedido',
  timestamps: true,
  underscored: true
});

const HistorialPedido = sequelize.define('HistorialPedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pedidoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Usuario que realizó el cambio'
  }
}, {
  tableName: 'historial_pedido',
  timestamps: true,
  underscored: true
});

// ============= CUPONES Y PROMOCIONES =============

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

const UsoCupon = sequelize.define('UsoCupon', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cuponId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pedidoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  montoDescuento: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'uso_cupones',
  timestamps: true,
  underscored: true
});

// ============= RESEÑAS =============

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

// ============= LISTA DE DESEOS =============

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

// ============= MÉTODOS DE ENVÍO =============

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

// ============= CONFIGURACIÓN =============

const ConfiguracionSitio = sequelize.define('ConfiguracionSitio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clave: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  valor: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tipo: {
    type: DataTypes.ENUM('texto', 'numero', 'booleano', 'json'),
    defaultValue: 'texto'
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'configuracion_sitio',
  timestamps: true,
  underscored: true
});

// ============= RELACIONES =============

// Ubicación geográfica
Departamento.belongsTo(Pais, { foreignKey: 'codigoPais', targetKey: 'codigo' });
Ciudad.belongsTo(Departamento, { foreignKey: 'codigoDepartamento', targetKey: 'codigo' });
Barrio.belongsTo(Ciudad, { foreignKey: 'codigoCiudad', targetKey: 'codigo' });
DireccionEnvio.belongsTo(Usuario, { foreignKey: 'usuarioId' });
DireccionEnvio.belongsTo(Barrio, { foreignKey: 'codigoBarrio', targetKey: 'codigo' });

// Categorías y productos
Categoria.belongsTo(Categoria, { as: 'CategoriaPadre', foreignKey: 'categoriasPadreId' });
Producto.belongsTo(Categoria, { foreignKey: 'categoriaId' });
Producto.belongsTo(Marca, { foreignKey: 'marcaId' });
ImagenProducto.belongsTo(Producto, { foreignKey: 'productoId' });
Variante.belongsTo(Producto, { foreignKey: 'productoId' });
AtributoProducto.belongsTo(Producto, { foreignKey: 'productoId' });

// Carrito
Carrito.belongsTo(Usuario, { foreignKey: 'usuarioId' });
ItemCarrito.belongsTo(Carrito, { foreignKey: 'carritoId' });
ItemCarrito.belongsTo(Producto, { foreignKey: 'productoId' });
ItemCarrito.belongsTo(Variante, { foreignKey: 'varianteId' });

// Pedidos
Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Pedido.belongsTo(DireccionEnvio, { foreignKey: 'direccionEnvioId' });
ItemPedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });
ItemPedido.belongsTo(Producto, { foreignKey: 'productoId' });
ItemPedido.belongsTo(Variante, { foreignKey: 'varianteId' });
HistorialPedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });
HistorialPedido.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// Cupones
UsoCupon.belongsTo(Cupon, { foreignKey: 'cuponId' });
UsoCupon.belongsTo(Usuario, { foreignKey: 'usuarioId' });
UsoCupon.belongsTo(Pedido, { foreignKey: 'pedidoId' });

// Reseñas
Resena.belongsTo(Producto, { foreignKey: 'productoId' });
Resena.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Resena.belongsTo(Pedido, { foreignKey: 'pedidoId' });

// Lista de deseos
ListaDeseos.belongsTo(Usuario, { foreignKey: 'usuarioId' });
ListaDeseos.belongsTo(Producto, { foreignKey: 'productoId' });

// Exportar todos los modelos
module.exports = {
  Usuario,
  Pais,
  Departamento,
  Ciudad,
  Barrio,
  DireccionEnvio,
  Categoria,
  Marca,
  Producto,
  ImagenProducto,
  Variante,
  AtributoProducto,
  Carrito,
  ItemCarrito,
  Pedido,
  ItemPedido,
  HistorialPedido,
  Cupon,
  UsoCupon,
  Resena,
  ListaDeseos,
  MetodoEnvio,
  ConfiguracionSitio
};*/