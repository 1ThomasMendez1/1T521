
const express = require('express');
const router = express.Router(); 
let usersController = require('../controladores/usersController'); 


//SUFIJOS

router.get('/register', usersController.register);  //router es la variable que almacena la ejecucion y get el metodo http
router.post('/register', usersController.procesarRegister);
router.get('/login', usersController.login);
router.post('/login',usersController.procesarLogin);


// (path)dentro del parentesis encontramos un string y hace referencia a la ruta en si misma (url que llega por peticion)
router.get('/', usersController.profile);
router.get('/profile-edit', usersController.profileEdit);
/*router.get('/product-add', usersController.productAdd)*/

module.exports = router; // exportamos  

//se encarga de direccionarte a algun lado segun a donde desees llegar