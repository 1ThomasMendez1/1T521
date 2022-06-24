
const express = require('express');
const router = express.Router(); 
let usersController = require('../controladores/usersController'); 


const multer = require('multer'); //requerimos multer en el archivo que procesa la informacion del formulario
const path = require('path'); //herramientas para trabajar con rutas de archivos y carpetas
const { removeListener } = require('process');


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
router.get('/login', usersController.login)
router.post('/register', upload.single('imgPerfil') , usersController.storeProfile)

router.get('/login', usersController.login);
router.post('/login' , usersController.procesarLogin);
router.post('/logout' , usersController.logout);

router.get('/profile/:id', usersController.perfil);

router.get('/profile-edit/:id', usersController.edit);
router.post('/profile', upload.single('image') ,  usersController.editProfile);



router.post('/profile/storeFollower', usersController.storeFollower);

router.get('/add', usersController.showProductAdd)
router.post('/store', upload.single('image'), usersController.store)




module.exports = router;  

