
// ========================================
// requestLogger.mw.js - Logger de Requests
// ========================================

/**
 * Middleware simple para logging de requests
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Log cuando termina la respuesta
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logMessage = `${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`;
    
    if (res.statusCode >= 400) {
      console.error('❌', logMessage);
    } else {
      console.log('✅', logMessage);
    }
  });

  next();
};

/**
 * Middleware detallado para logging en desarrollo
 */
const detailedRequestLogger = (req, res, next) => {
  if (process.env.NODE_ENV !== 'development') {
    return next();
  }

  console.log('\n📨 INCOMING REQUEST:');
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Query:', req.query);
  console.log('Body:', req.body);
  console.log('Headers:', req.headers);
  console.log('User:', req.usuario?.email || 'Anonymous');
  console.log('---');

  next();
};

module.exports = {
  requestLogger,
  detailedRequestLogger
};