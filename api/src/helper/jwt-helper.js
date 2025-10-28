const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario.models');
  
const generarJWT = async (id) => {
    console.log('generarJWT')
    console.log(id)
    try {
        const user = await Usuario.findByPk(id, {
            attributes: {
                exclude: ['password','bloqueado','intentos','activo']
            }
        });

        const payload = {
            user
        };
        console.log(payload)
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });
 
        return token;
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT');
    }
};

module.exports = {
    generarJWT,
};
