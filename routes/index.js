const express = require('express');
const router = express.Router();
let indexController = require('../controladores/indexController.js')

router.get('/', indexController.home)
//router.get('/loged', indexController)

module.exports = router;