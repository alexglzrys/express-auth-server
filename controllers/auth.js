// Obtener ayuda sobre metodos del response
const { response, request } = require('express');
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

// Indicamos que res es el response (para tener las ayudas de los métodos que ofrece). 
// Esto no es necesario, pero ayuda a la codificación
const crearUsuario = async(req = request, res = response) => {
   
    // Recuperar información enviada en el cuerpo de la petición
    const { name, email, password } = req.body;
    console.log(name, email, password);
  
    try {
        // Verificar que el email no se encuentre previamente registrado en base de datos
        let usuario = await User.findOne({email})

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo electrónico ya está en uso por otro usuario'
            })
        }
        
        // Crear una instancia de mi modelo de User con los datos del nuevo usuario a registrar
        const dbUser = new User(req.body);

        // Hashear contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt)

        // Generar JWT
        const token = await generateJWT(dbUser.id, name)

        // Registrar usuario en base de datos
        await dbUser.save()

        // Enviar respuesta al cliente
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor'
        })
    }
  
    
}

const loginUsuario = async(req = request, res = response) => {

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
    // console.log(email, password);

    try {
        // Confirmar si el email existe
        const dbUser = await User.findOne({email});
        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales de acceso incorrectas - Email not found',
            });
        }

        // Confirmar si el password hace match
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales de acceso incorrectas - Password invalid',
            });
        }

        // Usuario existe, es necesario generar el JWT
        const token = await generateJWT(dbUser.id, dbUser.name);

        // Enviar respuesta al cliente
        return res.status(200).json({
            ok: true,
            msg: 'Credenciales de acceso correctas',
            name: dbUser.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error interno en el servidor',
        });
    }
   
}

const renovarToken = async(req = request, res = response) => {
    // La intensión de este método es ejecutarlo cada vez que el usuario solicite
    // algo en el servidor. (refresque la pantalla, una consulta, etc). La intensión es renovarlo con una nueva vigencia.

    // Si llegamos a ejecutar este controlador, significa que uno de los middlewares anteriores inyectò informaciòn
    // del usuario en la peticiòn.
    const { fig_uid, fig_name } = req;

    try {
        // Generar un nuevo JWT con base a los datos parciales del usuaro (uid, name)
        const token = await generateJWT(fig_uid, fig_name);

        return res.json({
            ok: true,
            msg: 'Generar un nuevo token de usuario /renew',
            name: fig_name,
            token
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor',
        })
    }
    
}

// Exportar información concreta de este módulo
module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken
}