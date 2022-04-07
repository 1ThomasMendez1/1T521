const express = require('express');
const router = express.Router();
let indexController = require('../controladores/index.js')

router.get('/', indexController.index)

module.exports = router;