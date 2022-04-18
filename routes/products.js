const express = require('express'); //realizo un require del modulo express
const router = express.Router(); //variable que guarda la ejecución del método router de express
// nos trae los recursos necesarios para definir las rutas de un recurso en particular 
let productsController = require('../controladores/productsController'); //requiero el controlador de productos
router.get('/detalle/:idProducto', productsController) // ruta parametrizada
//estos son datos que pueden ir variando segun la peticion.
router.get('/add', productController.add)
