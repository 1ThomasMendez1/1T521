const express = require('express');
const router = express.Router();
const movieController = require('../controladores/movieController');
router.get('/movies', movieController.index);

module.exports = router;