// Middleware de autenticación
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }
  
  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};
// Middleware de roles
const roleMiddleware = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ mensaje: 'No tienes permisos para esta acción' });
    }
    next();
  };
};

// Middleware de sesión para carritos anónimos
const sessionMiddleware = (req, res, next) => {
  if (!req.usuario) {
    const crypto = require('crypto');
    req.sessionId = req.cookies?.sessionId || crypto.randomBytes(32).toString('hex');
    res.cookie('sessionId', req.sessionId, { 
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true 
    });
  }
  next();
};

module.exports = {
  authMiddleware,sessionMiddleware,roleMiddleware
};
