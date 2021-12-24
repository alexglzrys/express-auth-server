const { response, request } = require('express');
const { validationResult } = require('express-validator');

// Middleware personalizado para atrapar los posibles errores de validación de campos
const validateInputs = (req = request, res = response, next) => {

    // Atrapar los errores encontrados por el middleware de express-validator
    const errors = validationResult(req);
    // Obtener el mensaje del error de validación
    const errorFormatter = ({ msg }) => {
        return msg;
    }

    // Si hay errores, notificar al usuario mapeando los errores encontrados como respuesta
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
            errors2: errors.array(),
            msg: errors.formatWith(errorFormatter).array().shift()
        })
    }

    next();
}

module.exports = {
    validateInputs
}