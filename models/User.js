const { Schema, model } = require("mongoose");

// Generar esquema para el documento que representa un Usuario
const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Exportar el modelo
module.exports = model('User', UserSchema);