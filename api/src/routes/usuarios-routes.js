const { Router } = require('express');
const usuarioController = require('../controllers/Usuario.controller'); 
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware.mw');
const router = Router();

// Públicas
router.post('/auth/registrar', usuarioController.registrar);
router.post('/auth/login', usuarioController.login);

// Protegidas
router.get('/usuarios/perfil', authMiddleware, usuarioController.obtenerPerfil);
router.put('/usuarios/perfil', authMiddleware, usuarioController.actualizarPerfil);
router.put('/usuarios/cambiar-password', authMiddleware, usuarioController.cambiarPassword);

// Admin
router.get('/usuarios', authMiddleware, roleMiddleware('admin'), usuarioController.listarTodos);


module.exports = router;
