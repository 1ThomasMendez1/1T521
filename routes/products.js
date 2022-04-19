const express = require('express'); //realizo un require del modulo express
const router = express.Router();  //variable que guarda la ejecución del método router de express
let productos = require('../controladores/productsControllers'); //requiero el controlador de productos



router.get('/detalle', productos.index)
router.get('/', productos.index)
router.get('/product-add', productos.productAdd)
router.get('/search-results', productos.searchResults)

module.exports = router
