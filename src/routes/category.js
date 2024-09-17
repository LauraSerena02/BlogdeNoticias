const express = require('express');
const router = express.Router();//Permite crear los endpoints con sus respectivos metodos
const categories = require('../controllers/controllerCategory')

router.get('/categories', categories );

module.exports = router;