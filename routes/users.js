const express = require('express');
const router = express.Router();
let usersController = require('../controladores/usersController');

router.get('/register', usersController.register);
router.get('/login', usersController.login);
router.get('/profile-edit', usersController.editarPerfil);
module.exports = router;