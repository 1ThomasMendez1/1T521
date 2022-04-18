//esta es el archivo de rutas de usuarios
const express = require('express'); //realizo un require del modulo express
const router = express.Router(); //variable que guarda la ejecución del método router de express
// nos trae los recursos necesarios para definir las rutas de un recurso en particular 
let usersController = require('../controladores/usersController'); //requiero el controlador de usuario
//SUFIJOS
router.get('/register', usersController.register); 
//router es la variable que almacena la ejecucion y get el metodo http
router.get('/login', usersController.login);
// (path)dentro del parentesis encontramos un string y hace referencia a la ruta en si misma (url que llega por peticion)
router.get('/profile', usersController.profile)
//separado por coma encontramos el handler, que se encargara de tomar acción cuando se acceda a la ruta definida.
router.get('/profile-edit', usersController.editarPerfil);

module.exports = router; // exportamos  

//se encarga de direccionarte a algun lado segun a donde desees llegar