// Obtener ayuda sobre metodos del response
const { response, request } = require('express')

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

const login = (req = request, res) => {
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
    login,
    renovarToken
}