const express = require('express');
const router = express.Router();
let indexController = require('../controladores/indexController.js')


router.get('/', indexController.home)
router.get('/search', indexController.search);

router.get('/profileEdit/:id', indexController.profileEdit)


module.exports = router;