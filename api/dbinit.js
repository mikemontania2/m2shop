const bcrypt = require('bcrypt');
const Usuario = require("./src/models/Usuario.models"); 
const DireccionEnvio = require("./src/models/DireccionEnvio.models"); 
const Marca = require("./src/models/Marca.models");
 

// Datos de ejemplo
const datosEjemplo = require('./datos.json'); 
const { ejecutarMigracion } = require('./migraciones.services');

const populateDB = async () => {
  console.log("🔄 Iniciando población de base de datos...");
  
  if (process.env.DB_INIT !== "true") {
    console.log("⚠️  DB_INIT no está habilitado. Saltando población.");
    return;
  }

  try {
    console.log("📦 Inicializando registros en DB!");

   
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