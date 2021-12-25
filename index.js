// Importación de paquetes
const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./database/config');
require('dotenv').config();     // Configurar y registrar nuestro archivo local de variables de entorno (a las variables de entorno globales de NODE)

// Conexión a la base de datos
dbConnection()

// Inicializar servidor express
const app = express();

// Directorio con recursos publicos
app.use(express.static('public'));

// Middlewares
app.use(cors());                // habilitar CORS
app.use(express.json());        // lectura y parseo de información que viaje en el cuerpo de la petición (body)

// Importar Rutas
app.use('/api/auth', require('./routes/auth'));

// Servir nuestra SPA en cualquier otra ruta que no se encuentre registrado en este backend
// Esto permite al router de Angular tener el control de todas sus rutas registradas
// Esto se recomienda solo si el router de Angular tiene como configuración el useHash=false (por defecto)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

// Escuchar el servidor en el puerto cuyo valor se encuentra en la variable PORT de nuestro archivo .env
app.listen(process.env.PORT, () => {
    console.log(`Servidor HTTP coriendo en el puerto ${process.env.PORT}`);
});