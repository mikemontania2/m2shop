// ========================================
// authMiddleware.mw.js - CORREGIDO
// ========================================

const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario.models');
const crypto = require('crypto');

/**
 * Middleware de autenticación básico
 * Verifica que exista un token válido
 */
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar usuario actualizado
    const usuario = await Usuario.findByPk(decoded.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!usuario || !usuario.activo || usuario.bloqueado) {
      return res.status(401).json({ error: 'Usuario no válido' });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.error('Error en authMiddleware:', error);
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

/**
 * Middleware de roles
 * Verifica que el usuario tenga uno de los roles permitidos
 */
const roleMiddleware = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ 
        error: 'No tienes permisos para realizar esta acción',
        requiredRoles: rolesPermitidos,
        yourRole: req.usuario.rol
      });
    }
    
    next();
  };
};

/**
 * ✅ MIDDLEWARE DE SESIÓN CORREGIDO
 * - Lee sessionId del header x-session-id (enviado por el frontend)
 * - Si no existe, genera uno nuevo
 * - SIEMPRE envía el sessionId de vuelta en el header de respuesta
 * - NO usa cookies (evita problemas de CORS)
 */
const sessionMiddleware = (req, res, next) => {
  // Si hay usuario autenticado, no necesita sessionId
  if (req.usuario) {
    console.log('✅ Usuario autenticado, no requiere sessionId');
    return next();
  }

  // 🔑 Leer sessionId del header (el frontend lo envía aquí)
  let sessionId = req.headers['x-session-id'];

  // Si no existe, generar uno nuevo
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${crypto.randomBytes(16).toString('hex')}`;
    console.log('🆕 Nueva sesión generada:', sessionId);
  } else {
    console.log('♻️ Sesión existente:', sessionId);
  }

  // Guardar en req para usarlo en controladores
  req.sessionId = sessionId;

  // 📤 IMPORTANTE: Enviar sessionId de vuelta al cliente en el header
  res.setHeader('x-session-id', sessionId);

  next();
};

/**
 * ✅ MIDDLEWARE HÍBRIDO: Auth Opcional + Sesión
 * Intenta autenticar, si falla usa sessionId
 * PERFECTO para rutas de carrito
 */
const optionalAuthMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  // Intentar autenticar si hay token
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const usuario = await Usuario.findByPk(decoded.user.id, {
        attributes: { exclude: ['password'] }
      });

      if (usuario && usuario.activo && !usuario.bloqueado) {
        req.usuario = usuario;
        console.log('✅ Usuario autenticado:', usuario.email);
        return next(); // No necesita sessionId
      }
    } catch (error) {
      console.log('⚠️ Token inválido, usando sesión anónima');
    }
  }
  
  // Si no hay usuario válido, usar sessionId
  let sessionId = req.headers['x-session-id'];

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${crypto.randomBytes(16).toString('hex')}`;
    console.log('🆕 Nueva sesión anónima:', sessionId);
  } else {
    console.log('♻️ Sesión anónima existente:', sessionId);
  }

  req.sessionId = sessionId;
  
  // 📤 Enviar sessionId de vuelta
  res.setHeader('x-session-id', sessionId);

  next();
};

/**
 * Middleware para verificar propiedad de recursos
 */
const ownershipMiddleware = (resourceUserIdField = 'usuarioId') => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    if (req.usuario.rol === 'admin') {
      return next();
    }

    const resourceUserId = req.body[resourceUserIdField] || req.params[resourceUserIdField];
    
    if (resourceUserId && parseInt(resourceUserId) !== req.usuario.id) {
      return res.status(403).json({ 
        error: 'No tienes permiso para acceder a este recurso'
      });
    }

    next();
  };
};

/**
 * Middleware para rate limiting básico
 */
const rateLimitMap = new Map();

const rateLimitMiddleware = (maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
  return (req, res, next) => {
    const identifier = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!rateLimitMap.has(identifier)) {
      rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
      return next();
    }

    const userData = rateLimitMap.get(identifier);

    if (now > userData.resetTime) {
      rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (userData.count >= maxAttempts) {
      return res.status(429).json({
        error: 'Demasiados intentos. Intenta nuevamente más tarde.',
        retryAfter: Math.ceil((userData.resetTime - now) / 1000)
      });
    }

    userData.count++;
    next();
  };
};

/**
 * Middleware para logging de acciones
 */
const auditMiddleware = (action) => {
  return (req, res, next) => {
    const logData = {
      timestamp: new Date().toISOString(),
      action,
      userId: req.usuario?.id || 'anonymous',
      sessionId: req.sessionId || 'N/A',
      userEmail: req.usuario?.email || 'N/A',
      ip: req.ip || req.connection.remoteAddress,
      method: req.method,
      path: req.path,
      body: req.method !== 'GET' ? req.body : undefined
    };

    console.log('📝 AUDIT LOG:', JSON.stringify(logData, null, 2));
    next();
  };
};

module.exports = {
  authMiddleware,
  roleMiddleware,
  sessionMiddleware,
  optionalAuthMiddleware,
  ownershipMiddleware,
  rateLimitMiddleware,
  auditMiddleware
};