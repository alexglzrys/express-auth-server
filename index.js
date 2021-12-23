// Importación de paquetes
const express = require('express');

// Inicializar servidor express
const app = express();

// Importar Rutas
app.use('/api/auth', require('./routes/auth'));

// Escuchar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log(`Servidor HTTP coriendo en el puerto 3000`);
});