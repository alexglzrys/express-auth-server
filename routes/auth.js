const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, renovarToken, loginUsuario } = require('../controllers/auth');

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/new', crearUsuario);

// Login
router.post('/', [
    // Listado de middlewares que se deben cumplir para ejecutar el controlador
    check('email', 'El correo electrónico es un dato requerido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6})
] , loginUsuario);

// Regenerar token
router.get('/renew', renovarToken);

// Exportar módulo de rutas
module.exports = router;