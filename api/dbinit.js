 
 

// Datos de ejemplo
const datosEjemplo = require('./datos.json'); 
const { ejecutarMigracion } = require('./migraciones.services');
const Bcryptjs = require("bcryptjs");
const Usuario = require('./src/models/Usuario.models');

const populateDB = async () => {
  console.log("🔄 Iniciando población de base de datos...");
  
  if (process.env.DB_INIT !== "true") {
    console.log("⚠️  DB_INIT no está habilitado. Saltando población.");
    return;
  }

  try {
    console.log("📦 Inicializando registros en DB!");

   
    await ejecutarMigracion();
    const usuarios = datosEjemplo.usuarios;

    for (const u of usuarios) {
      const salt = Bcryptjs.genSaltSync(10);
      const hashedPassword = Bcryptjs.hashSync('12345678', salt);

      const nuevoUsuario = await Usuario.create({
        email: u.email,
        password: hashedPassword,
        nombre: u.nombre, 
        telefono: u.telefono || '',
        documento: u.documento || '',
        fechaNacimiento: u.fechaNacimiento || null,
        activo: u.activo ?? true,
        rol: u.rol || 'cliente',
        emailVerificado: u.emailVerificado ?? false,
      });
    console.log("email ",nuevoUsuario.email);

    }



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