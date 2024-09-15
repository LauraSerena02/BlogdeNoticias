const express = require('express');
const { login, createUser } = require('../controllers/controllerAuthentication');
//Permite crear los endpoints con sus respectivos metodos
const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', login);
router.post('/createUser', createUser);

module.exports = router;
