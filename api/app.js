require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { dbConnection } = require("./dbconfig");
// Registrar modelos (asociaciones) antes de sync
require("./src/models");
const { populateDB } = require("./dbinit");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Healthcheck
app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "m2shop-api" });
});

// Rutas
app.use("/M2POS/ejemplo", require("./src/routes/ejemplo-routes"));
app.use("/api/categories", require("./src/routes/category.routes"));
app.use("/api/products", require("./src/routes/product.routes"));
app.use("/api/orders", require("./src/routes/order.routes"));
app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/discounts", require("./src/routes/discount.routes"));

const dbSetup = async () => {
  await dbConnection();
  await populateDB();
};

// Inicializar DB y luego arrancar servidor
(async () => {
  try {
    await dbSetup();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log("Servidor corriendo en puerto " + port));
  } catch (err) {
    console.error("Fallo al iniciar el servidor", err);
    process.exit(1);
  }
})();
