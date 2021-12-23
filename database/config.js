const mongoose = require("mongoose")

// Función para conectar con base de datos MONGODB
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.CONNECTION_MONGODB)
        console.log('Conexión exitosa (DB)');
    } catch (error) {
        console.log(error)
        throw new Error('Error al momento de conectarse con la base de datos')
    }
}

module.exports = {
    dbConnection
}