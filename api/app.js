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
// Configurar CORS
app.use(cors());
//loggerPos();
// Base de datos
const dbSetup = async () => {
  await dbConnection(); //crea conexion
  await populateDB(); //inserta registros
};
dbSetup(); 
 
app.use("/M2SHOP/carritos", require("./src/routes/carritos-routes"));
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
app.use("/M2SHOP/ubicaciones", require("./src/routes/ubicaciones-routes"));
app.use("/M2SHOP/usuarios", require("./src/routes/usuarios-routes")); 

app.listen(process.env.PORT, () =>
  console.log("Servidor corriendo en puerto " + process.env.PORT)
);
