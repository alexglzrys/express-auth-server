const { Router } = require('express');
const { crearUsuario, login, renovarToken } = require('../controllers/auth');

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/new', crearUsuario);

// Login
router.post('/', login);

// Regenerar token
router.get('/renew', renovarToken);

// Exportar módulo de rutas
module.exports = router;