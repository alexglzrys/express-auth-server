// Importación de paquetes
const express = require('express');

// Inicializar servidor express
const app = express();

// Definición de rutas
app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        msg: 'Todo salió bien',
        uid: 1234
    });
});

// Escuchar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log(`Servidor HTTP coriendo en el puerto 3000`);
});