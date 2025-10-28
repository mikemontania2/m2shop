require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./dbconfig");
const { populateDB } = require("./dbinit");

const morgan = require("morgan"); // const { json } = require('express/lib/response');
 
//const { loggerPos } = require("./logger");
// Este es un comentario
// Crear el servidor de express
const app = express();
//middlewares
app.use(morgan("dev"));
app.use(express.json());
// Configurar CORS para permitir todo
const allowedOrigins = ['http://localhost:5173']; // tu frontend

const corsOptions = {
  origin: function(origin, callback) {
    // Permitir requests sin origin (p.ej: Postman) o desde allowedOrigins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // <- permite enviar cookies o headers de auth
};

// Aplicar CORS antes de las rutas
app.use(cors(corsOptions)); 
//loggerPos();
// Base de datos
const dbSetup = async () => {
  await dbConnection(); //crea conexion
  await populateDB(); //inserta registros
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
app.use("/M2SHOP/resenas", require("./src/routes/resenas-routes")); 
app.use("/M2SHOP/usuarios", require("./src/routes/usuarios-routes")); 
app.use("/M2SHOP/variantes", require("./src/routes/variantes-routes"));  
app.listen(process.env.PORT, () =>
  console.log("Servidor corriendo en puerto " + process.env.PORT)
);
