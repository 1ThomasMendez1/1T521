//esta es el archivo de rutas de usuarios
const express = require('express'); //realizo un require del modulo express
const router = express.Router(); //variable que guarda la ejecución del método router de express
let usersController = require('../controladores/usersController'); //requiero el controlador de usuario


//SUFIJOS
router.get('/', usersController.profile);
router.get('/register', usersController.register);  //router es la variable que almacena la ejecucion y get el metodo http
router.get('/login', usersController.login); // (path)dentro del parentesis encontramos un string y hace referencia a la ruta en si misma (url que llega por peticion)
router.get('/profile-edit', usersController.profileEdit);

module.exports = router; // exportamos  

//se encarga de direccionarte a algun lado segun a donde desees llegar