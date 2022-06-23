const express = require('express'); //realizo un require del modulo express
const router = express.Router();  //variable que guarda la ejecución del método router de express
let productsControllers = require('../controladores/productsControllers'); //requiero el controlador de productos


// Multer para subir foto del producto
let multer = require('multer');
let path = require('path');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/products')) 
    },
    filename : function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage: storage})

// Mostrar producto

router.get('/:id', productsControllers.show)

//Mostrar comentario

router.post('/id/:id', productsControllers.comments)

router.post('/storeComment', productsControllers.storeComment); 

// Eliminar producto 

router.post('id/:id/delete', productsControllers.deleteProduct)

// Agregar un producto

router.get('/add', productsControllers.showProductAdd)

router.post('/store', upload.single('imgProduct'), productsControllers.store)

// Editar producto 

router.get('/edit/:id' , productsControllers.showProductEdit)

router.post('/edit/:id', upload.single('imgProduct'), productsControllers.updateProduct)

module.exports = router;