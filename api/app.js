require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./dbconfig");
const { populateDB } = require("./dbinit");

const morgan = require("morgan");
 
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());

// ✅ CONFIGURACIÓN CORS CORREGIDA
const corsOptions = {
  origin: function(origin, callback) {
    // Permitir requests sin origin (p.ej: Postman) o desde cualquier origen
    if (!origin) {
      callback(null, true); // ✅ Cambié "origin" por "true"
    } else {
      callback(null, true); // ✅ Permitir todos los orígenes
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type", 
    "Authorization",
    "x-session-id" // ✅ AGREGADO: Permitir enviar este header
  ],
  exposedHeaders: ["x-session-id"], // ✅ AGREGADO: Permitir leer este header
  credentials: true
};

// Aplicar CORS antes de las rutas
app.use(cors(corsOptions)); 

// Base de datos
const dbSetup = async () => {
  await dbConnection();
  await populateDB();
};
dbSetup(); 

app.use("/M2SHOP/auth", require("./src/routes/auth-routes")); 
app.use("/M2SHOP/carrito", require("./src/routes/carritos-routes"));
app.use("/M2SHOP/categorias", require("./src/routes/categorias-routes"));
app.use("/M2SHOP/configuraciones", require("./src/routes/configuraciones-routes"));
app.use("/M2SHOP/cupones", require("./src/routes/cupones-routes"));
app.use("/M2SHOP/direcciones", require("./src/routes/direcciones-routes"));
app.use("/M2SHOP/estadisticas", require("./src/routes/estadisticas-routes"));
app.use("/M2SHOP/lista-deseos", require("./src/routes/listaDeseos-routes"));
app.use("/M2SHOP/marcas", require("./src/routes/marcas-routes"));
app.use("/M2SHOP/metodos-envio", require("./src/routes/metodosEnvio-routes"));
app.use("/M2SHOP/pedidos", require("./src/routes/pedidos-routes"));
app.use("/M2SHOP/productos", require("./src/routes/productos-routes"));
app.use("/M2SHOP/producto-admin", require("./src/routes/productoAmin-routes"));
app.use("/M2SHOP/resenas", require("./src/routes/resenas-routes")); 
app.use("/M2SHOP/tarjetas", require("./src/routes/tarjetas-routes")); 
app.use("/M2SHOP/usuarios", require("./src/routes/usuarios-routes")); 
app.use("/M2SHOP/variantes", require("./src/routes/variantes-routes"));  

app.listen(process.env.PORT, () =>
  console.log("Servidor corriendo en puerto " + process.env.PORT)
);