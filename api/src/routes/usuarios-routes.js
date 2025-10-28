const { Router } = require('express');
const usuarioController = require('../controllers/Usuario.controller'); 
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware.mw');
const router = Router();
 

module.exports = router;
