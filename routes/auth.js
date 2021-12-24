const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, renovarToken, loginUsuario } = require('../controllers/auth');
const { validateInputs } = require('../middlewares/validate');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/new', [
    check('email', 'El correo electrónico es un dato requerido').isEmail(),
    check('password', 'La contraseña debe ser de al menos 6 caracteres').isLength({min: 6}),
    check('name', 'El nombre es un dato requerido').not().isEmpty(),
    // Llamar al middleware encargado de detectar si hay errores de validación
    validateInputs
], crearUsuario);

// Login
router.post('/', [
    // Listado de middlewares que se deben cumplir para ejecutar el controlador
    check('email', 'El correo electrónico es un dato requerido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6}),
    validateInputs
] , loginUsuario);

// Regenerar token
router.get('/renew', validateJWT , renovarToken);

// Exportar módulo de rutas
module.exports = router;