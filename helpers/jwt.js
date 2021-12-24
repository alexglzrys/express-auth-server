const jwt = require('jsonwebtoken')

const generateJWT = (uid, name) => {
    const payload = { uid, name };

    // Genero una promesa, ya que este paquete aun trabaja con callbacks y rompe la metodologia de trabajo para este proyecto
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '24h'
        }, (error, token) => {
            if (error) {
                return reject(error)
            } else {
                return resolve(token)
            }
        });
    })   
}

module.exports = {
    generateJWT
}