// Obtener ayuda sobre metodos del response
const { response, request } = require('express');
const { validationResult } = require('express-validator');

// Indicamos que res es el response (para tener las ayudas de los métodos que ofrece). 
// Esto no es necesario, pero ayuda a la codificación
const crearUsuario = (req = request, res = response) => {
   
    // Recuperar información enviada en el cuerpo de la petición
    const { name, email, password } = req.body;
    console.log(name, email, password);
    return res.json({
        ok: true,
        msg: 'Crear usuario /new'
    })
}

const loginUsuario = (req = request, res = response) => {

    // // Atrapar los errores encontrados por el middleware de express-validator
    // const errors = validationResult(req);
    
    // // Si hay errores, notificar al usuario mapeando los errores encontrados como respuesta
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({
    //         ok: false,
    //         errors: errors.mapped()
    //     })
    // }

    const { email, password } = req.body
    console.log(email, password);
    res.json({
        ok: true,
        msg: 'Login de usuario /',
    });
}

const renovarToken = (req, res) => {
    return res.json({
        ok: true,
        msg: 'Generar un nuevo token de usuario /renew'
    })
}

// Exportar información concreta de este módulo
module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken
}