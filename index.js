// Importación de paquetes
const express = require('express');
const cors = require('cors');

// Inicializar servidor express
const app = express();

// Middlewares
app.use(cors());                // habilitar CORS
app.use(express.json());        // lectura y parseo de información que viaje en el cuerpo de la petición (body)

// Importar Rutas
app.use('/api/auth', require('./routes/auth'));

// Escuchar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log(`Servidor HTTP coriendo en el puerto 3000`);
});