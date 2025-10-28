// ========================================
// validar-jwt.js - ACTUALIZADO
// ========================================

const jsonwebtoken = require('jsonwebtoken');
const Usuario = require('../models/Usuario.models');

const validarJWT = async (req, res, next) => {
    let token = null;

    // Verificar si el encabezado tiene el formato "Bearer TOKEN"
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            error: 'Token no proporcionado'
        });
    }

    try {
        // Verificar el token y extraer el usuario
        const { user } = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        
        // Verificar que el usuario siga existiendo y esté activo
        const usuarioDB = await Usuario.findByPk(user.id, {
            attributes: { exclude: ['password'] }
        });

        if (!usuarioDB) {
            return res.status(401).json({
                error: 'Usuario no encontrado'
            });
        }

        if (!usuarioDB.activo) {
            return res.status(401).json({
                error: 'Usuario inactivo'
            });
        }

        if (usuarioDB.bloqueado) {
            return res.status(401).json({
                error: 'Usuario bloqueado'
            });
        }

        // Asignar valores al objeto "req" para usar en rutas posteriores
        req.usuario = usuarioDB;
        
        next();
    } catch (error) {
        console.error('Error validando JWT:', error);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Token expirado'
            });
        }
        
        return res.status(401).json({
            error: 'Token inválido'
        });
    }
};

module.exports = {
    validarJWT
};


