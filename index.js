// Importación de paquetes
const express = require('express');
const cors = require('cors');
require('dotenv').config();     // Configurar y registrar nuestro archivo local de variables de entorno (a las variables de entorno globales de NODE)

// Inicializar servidor express
const app = express();

// Directorio con recursos publicos
app.use(express.static('public'));

// Middlewares
app.use(cors());                // habilitar CORS
app.use(express.json());        // lectura y parseo de información que viaje en el cuerpo de la petición (body)

// Importar Rutas
app.use('/api/auth', require('./routes/auth'));

// Escuchar el servidor en el puerto cuyo valor se encuentra en la variable PORT de nuestro archivo .env
app.listen(process.env.PORT, () => {
    console.log(`Servidor HTTP coriendo en el puerto ${process.env.PORT}`);
});