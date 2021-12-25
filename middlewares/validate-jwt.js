const { request, response } = require("express")
const jwt = require('jsonwebtoken');

// middleware personalizado para verificar que el JTW enviado en los headers de la peticiòn sea vàlido

const validateJWT = (req = request, res = response, next) => {
    // Leer información que viaja en el header de la petición
    const headerToken = req.header('x-token');
    // Verificar que el token venga con la petición
    if (!headerToken) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token'
        })
    }

    try {
        // Verificar que el token enviado sea correcto
        const infoToken = jwt.verify(headerToken, process.env.SECRET_JWT);
        console.log(infoToken);

        // Enviar al siguiente middleware el "uid, y name" del usuario que se encuentra actualmente registrado en este token
        // Para ello inyectamos informaciòn en la peticiòn (request)
        req.fig_uid = infoToken.uid;
        req.fig_name = infoToken.name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    next();
}


module.exports = {
    validateJWT
}