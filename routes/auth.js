const { Router } = require('express');

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/new', (req, res) => {
    return res.json({
        ok: true,
        msg: 'Crear usuario /new'
    })
});

// Login
router.post('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Login de usuario /',
    });
});

// Regenerar token
router.get('/renew', (req, res) => {
    return res.json({
        ok: true,
        msg: 'Generar un nuevo token de usuario /renew'
    })
})

// Exportar módulo de rutas
module.exports = router;