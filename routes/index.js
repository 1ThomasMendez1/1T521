const express = require('express');
const router = express.Router();
let indexController = require('../controladores/index.js')

router.get('/', indexController.index)
router.get('/loged', indexController.index)

module.exports = router;