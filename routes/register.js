const express = require('express');
const registerController = require('../controladores/register');
const router = express.Router();
let indexController = require('../controladores/register')

router.get('/' , registerController.register)
module.exports = router;