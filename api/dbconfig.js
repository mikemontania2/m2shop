const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_CNN, {
  logging: console.log,
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  },
  logQueryParameters: true,
});

const dbConnection = async () => {
  try {
    await sequelize.authenticate();

    if (process.env.DB_INIT === "true") {
      await sequelize.sync({ force: true });
    } else {
      await sequelize.sync();
    }

    console.log("Conectado a la BD: %j", process.env.DB_CNN);
  } catch (error) {
    console.error(error);
    throw new Error("Error al conectarse a la BD");
  }
};

module.exports = {
  sequelize,
  dbConnection,
};
