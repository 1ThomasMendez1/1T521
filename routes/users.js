const express = require('express');
const router = express.Router();
let usersController = require('../controladores/usersController')

router.get('/register', usersController.register);
module.exports = router;