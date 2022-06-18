const express = require('express');
const router = express.Router();
let indexController = require('../controladores/indexController.js')

<<<<<<< HEAD
router.get('/', indexController.index )
router.get('/loged', )
=======
router.get('/', indexController.index)
router.get('/loged', indexController.show)
>>>>>>> a6c7c644b227f200d7a5e9d3fff31e123363ba3e

module.exports = router;