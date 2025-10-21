// authMiddleware.js - Para proteger rutas
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};

// roleMiddleware.js - Para verificar roles
const roleMiddleware = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ mensaje: 'No tienes permisos' });
    }
    next();
  };
};

// sessionMiddleware.js - Para carritos anónimos
const sessionMiddleware = (req, res, next) => {
  if (!req.usuario) {
    req.sessionId = req.cookies.sessionId || generateSessionId();
    res.cookie('sessionId', req.sessionId, { maxAge: 7 * 24 * 60 * 60 * 1000 });
  }
  next();
};