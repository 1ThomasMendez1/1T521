
const express = require('express');
const router = express.Router(); 
let usersController = require('../controladores/usersController'); 

let multer = require('multer')
let path = require('path')

let storage = multer.diskStorage({  //configuramos de multer la destinacion del archivo que vamos a guardar y el filename.
    destination : function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/users'))
    },
    filename : function(req, file, cb) {
      
        /*          name campoDelForm          -   26052022                 .png  */
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
});

let upload = multer({ storage:storage }) //configuramos una variable llamada upload para dentro de multer, guardar la variable creada que configura la destinacion y filename

//SUFIJOS //router es la variable que almacena la ejecucion y get el metodo http
router.get('/', usersController.login );

router.get('/register',  usersController.register ); 
router.post('/register', upload.single('imgPerfil') , usersController.procesarRegister); //procesa el post del form

router.get('/login', usersController.login); 
router.post('/login', usersController.procesarLogin); 

router.get('/profile-edit', );
router.get('/product-add', )

//SUFIJOS

router.get('/register', usersController.register);  //router es la variable que almacena la ejecucion y get el metodo http
router.post('/register', usersController.procesarRegister);
router.get('/login', usersController.login);
router.post('/login',usersController.procesarLogin);


// (path)dentro del parentesis encontramos un string y hace referencia a la ruta en si misma (url que llega por peticion)
router.get('/', usersController.profile);
router.get('/profile-edit', usersController.profileEdit);
router.get('/product-add', usersController.productAdd)


module.exports = router; // exportamos  

//se encarga de direccionarte a algun lado segun a donde desees llegar
// (path)dentro del parentesis encontramos un string y hace referencia a la ruta en si misma (url que llega por peticion)