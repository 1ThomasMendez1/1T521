
const express = require('express');
const router = express.Router(); 
let usersController = require('../controladores/usersController.js'); 

const multer = require('multer'); //requerimos multer en el archivo que procesa la informacion del formulario
const path = require('path'); //herramientas para trabajar con rutas de archivos y carpetas


let storage = multer.diskStorage({  //configuramos de multer la destinacion del archivo que vamos a guardar y en filename el nombre como se guardaria.
    destination : function(req, file, cb) { 
     cb(null, path.join(__dirname, '../public/images/users'))
    },
    filename : function(req, file, cb) {
     cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
});

let upload = multer({ storage:storage }) //configuramos una variable llamada upload para dentro de multer, guardar la variable creada que configura la destinacion y filename

//SUFIJOS //router es la variable que almacena la ejecucion y get el metodo http
router.get('/register', usersController.register );

router.post('/register', upload.single('imgPerfil') , usersController.storeProfile)

router.get('/login', usersController.login);
router.post('/login' , usersController.procesarLogin);
router.post('/logout' , usersController.logout);

router.get('/profile/:id', usersController.perfil);

router.post('/storeFollower', usersController.storeFollower);



//router.get('/profile-edit', );
//router.get('/product-add', )

//SUFIJOS

//router.get('/register', usersController.register);  //router es la variable que almacena la ejecucion y get el metodo http
////router.post('/register', usersController.procesarRegister);
//router.get('/login', usersController.login);
//router.post('/login',usersController.procesarLogin);


// (path)dentro del parentesis encontramos un string y hace referencia a la ruta en si misma (url que llega por peticion)
//router.get('/', usersController.profile);
///router.get('/profile-edit', usersController.profileEdit);
//router.get('/product-add', usersController.productAdd)


module.exports = router;  

//se encarga de direccionarte a algun lado segun a donde desees llegar
// (path)dentro del parentesis encontramos un string y hace referencia a la ruta en si misma (url que llega por peticion)
