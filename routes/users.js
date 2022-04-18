//esta es el archivo de rutas de usuarios
const express = require('express'); //realizo un require del modulo express
const router = express.Router(); //variable que guarda la ejecución del método router de express
// nos trae los recursos necesarios para definir las rutas de un recurso en particular 
let usersController = require('../controladores/usersController'); //requiero el controlador de usuario

router.get('/register', usersController.register); //aqui le indicamos que cada vez que escuche '/register'
//
router.get('/login', usersController.login);
router.get('/profile', usersController.profile)
router.get('/profile-edit', usersController.editarPerfil);
module.exports = router; // exportamos  

//se encarga de direccionarte a algun lado segun a donde desees llegar