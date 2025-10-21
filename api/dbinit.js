const bcrypt = require('bcrypt');
const Usuario = require("./src/models/Usuario.models");
const Pais = require("./src/models/Pais.models");
const Departamento = require("./src/models/Departamento.models");
const Ciudad = require("./src/models/Ciudad.models");
const Barrio = require("./src/models/Barrio.models");
const DireccionEnvio = require("./src/models/DireccionEnvio.models");
const Categoria = require("./src/models/Categoria.models");
const Marca = require("./src/models/Marca.models");
const Producto = require("./src/models/Producto.models");
const ImagenProducto = require("./src/models/ImagenProducto.models");
const Variante = require("./src/models/Variante.models"); 
const Carrito = require("./src/models/Carrito.models");
const ItemCarrito = require("./src/models/ItemCarrito.models");

const Pedido = require("./src/models/Pedido.models");
const ItemPedido = require("./src/models/ItemPedido.models");
const HistorialPedido = require("./src/models/HistorialPedido.models");
const Cupon = require("./src/models/Cupon.models");
const UsoCupon = require("./src/models/UsoCupon.models");

const Resena = require("./src/models/Resena.models");
const ListaDeseos = require("./src/models/ListaDeseos.models");
const MetodoEnvio = require("./src/models/MetodoEnvio.models");
const ConfiguracionSitio = require("./src/models/ConfiguracionSitio.models");
 

// Datos de ejemplo
const datosEjemplo = require('./datos.json');
const Banner = require('./src/models/Banner.models');
const { ejecutarMigracion } = require('./migraciones.services');

const populateDB = async () => {
  console.log("🔄 Iniciando población de base de datos...");
  
  if (process.env.DB_INIT !== "true") {
    console.log("⚠️  DB_INIT no está habilitado. Saltando población.");
    return;
  }

  try {
    console.log("📦 Inicializando registros en DB!");

     // ============= 5. USUARIOS =============
    console.log("5️⃣  Insertando usuarios...");
    for (const usuario of datosEjemplo.usuarios) {
      const usuarioExiste = await Usuario.findOne({ where: { email: usuario.email } });
      
      if (!usuarioExiste) {
        // Generar hash real de la contraseña
        const passwordHash = await bcrypt.hash('password123', 10);
        await Usuario.create({
          ...usuario,
          password: passwordHash
        });
      }
    }
    console.log("✅ Usuarios insertados (password: password123)");


    // ============= 1. PAÍSES =============
    console.log("1️⃣  Insertando países...");
    for (const pais of datosEjemplo.paises) {
      await Pais.findOrCreate({
        where: { id: pais.id },
        defaults: pais
      });
    }
    console.log("✅ Países insertados");

    // ============= 2. DEPARTAMENTOS =============
    console.log("2️⃣  Insertando departamentos...");
    for (const depto of datosEjemplo.departamentos) {
      await Departamento.findOrCreate({
        where: { id: depto.id },
        defaults: depto
      });
    }
    console.log("✅ Departamentos insertados");

    // ============= 3. CIUDADES =============
    console.log("3️⃣  Insertando ciudades...");
    for (const ciudad of datosEjemplo.ciudades) {
      await Ciudad.findOrCreate({
        where: { id: ciudad.id },
        defaults: ciudad
      });
    }
    console.log("✅ Ciudades insertadas");

    // ============= 4. BARRIOS =============
    console.log("4️⃣  Insertando barrios...");
    for (const barrio of datosEjemplo.barrios) {
      await Barrio.findOrCreate({
        where: { id: barrio.id },
        defaults: barrio
      });
    }
    console.log("✅ Barrios insertados");

   
    // ============= 6. DIRECCIONES DE ENVÍO =============
    console.log("6️⃣  Insertando direcciones de envío...");
    for (const direccion of datosEjemplo.direccionesEnvio) {
      await DireccionEnvio.findOrCreate({
        where: { id: direccion.id },
        defaults: direccion
      });
    }
    console.log("✅ Direcciones insertadas");

    // ============= 7. MARCAS =============
    console.log("7️⃣  Insertando marcas...");
    for (const marca of datosEjemplo.marcas) {
      await Marca.findOrCreate({
        where: { slug: marca.slug },
        defaults: marca
      });
    }
    console.log("✅ Marcas insertadas");

    await ejecutarMigracion();
    console.log("\n👤 Usuarios creados:");
    console.log("   - admin@cavallaro.com.py (Admin)");
    console.log("   - vendedor@cavallaro.com.py (Vendedor)");
    console.log("   - juan.perez@gmail.com (Cliente)");
    console.log("   - ana.martinez@hotmail.com (Cliente)");
    console.log("   - roberto.gomez@yahoo.com (Cliente)");
    console.log("   📝 Password para todos: password123");

  } catch (error) {
    console.error("❌ Error al poblar la base de datos:", error);
    throw error;
  }
};
 
module.exports = { populateDB  };