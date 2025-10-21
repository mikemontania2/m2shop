const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    // Obtener los errores de validación
    const errores = validationResult(req);

    // Si hay errores, responder con un código de estado 400 y los errores en formato JSON
    if (!errores.isEmpty()) {
        return res.status(400).json({
           
            error: errores.mapped() // Mapear los errores para una mejor estructura
        });
    }

    // Si no hay errores, continuar con la siguiente función de middleware
    next();
}

module.exports = {
    validarCampos
};
