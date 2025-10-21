const express = require('express');
const router = express.Router();
const expressFileUpload = require('express-fileupload');
const controller = require('../controllers/uploads-controller.js');

const { validarJWT } = require('../middlewares/validar-jwt');
 
// Permite cargar el archivo
router.use(expressFileUpload());

router.put('/certificado/:certificadoId', validarJWT,controller.p12fileUpload);
// Ruta para cargar una imagen
router.put('/:tipo/:id', validarJWT,   controller.fileUpload);
// Ruta para obtener una imagen
router.get('/:tipo/:foto', controller.getImage);

module.exports = router;
