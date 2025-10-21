const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_CNN, {
    logging: true, //default true
    pool: {
        max: 5,
        idle: 30000,
        require: 60000,
    },
    logQueryParameters: true,

});

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        
        if (process.env.DB_INIT == 'true') {
           
            await sequelize.sync({ force: true }); // 🔄 Recrea todas las tablas definidas
        } else {
            //solo crea
            await sequelize.sync();
        }
        
        console.log('Conectado a la BD: %j', process.env.DB_CNN);
    } catch (error) {
        console.error(error);
        throw new Error('Error al conectarse a la BD');
    }
}

module.exports = {
    sequelize,
    dbConnection
}