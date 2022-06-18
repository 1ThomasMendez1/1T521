<<<<<<< HEAD
// const db = require("../database/models") //requiero models de la base de datos
// const user = db.User; // le asigno a la variable user el modulo exportado de la carpeta database

//Requiero el modulo de bcrypt 
// const bcryptjs = require('bcryptjs') // para encriptar datos

const usersController = {

    login: (req,res) => {
        
return res.render('login') // lo envia a la pagina login
    },

    procesarLogin: (req,res) => { 
        
        let info = req.body; //Solicito informacion de 'body' que viene en el parametro request

        let errors = {}; //capturo errores

        if (info.email == "") {  //si el email del objeto body esta vacio aparece un mensaje
            errors.message = "El input de email esta vacio";
            res.locals.errors = errors; //envio la variable errors con la info a locals en la response
            return res.render("login");
            
        } else if (info.password == ""){
            errors.message = "El input de password esta vacio";
            res.locals.errors = errors;
            return res.render('login')
    }
    },

    register : (req,res) => {
        return res.render('register') // lo envia a la pagina register
            },
    procesarRegister : (req,res) => {
        let info = req.body; //Solicito informacion de 'body' que viene en el parametro request
       console.log(req.body)
        let errors = {}; //capturo errores

        if (info.name == "") {
            errors.message = "El nombre estaba vacio!";
            res.locals.errors = errors;
            return res.render('register')
            
        } else if (info.email == ""){
            errors.message = "El email estaba vacio!";
            res.locals.errors = errors;
            return res.render('register')

        }  else if (info.password == ""){
            errors.message = "La password estaba vacia!";
            res.locals.errors = errors;
            return res.render('register')
            

        }  else if (info.date == ""){
            errors.message = "La fecha estaba vacia!";
            res.locals.errors = errors;
            return res.render('register')

            //Comparar emails 

            } else if (info.password.length < 3) {
            errors.message = "El input de password era menor de 3 caracteres"
            res.locals.errors = errors;
            return res.render('register') }

            else { //Si todo estaba completo, guardamos la password encryptada, guardamos la img en una variable, creamos el objeto literal con la informacion del usuario

                let passEncriptada = bcryptjs.hashSync(info.password, 10);
                let imgPerfil = req.file.filename;
    
                let userParaGuardar = {
                    name : info.name,
                    email : info.email,
                    password : passEncriptada,
                    remember_token: "false",
                    created_at : new Date(),
                    updated_at : new Date(),
                    img : imgPerfil
                }
                
                user.create(userParaGuardar)
                .then((result) => {
                    return res.redirect("/users/login")
                });
                
            }
    
    }


};


module.exports = usersController;
=======
const modulos = require("../database/modulos");
const user = modulos.usuarios

/* Requiriendo el modulo de bcryptjs */
const bcryptjs = require('bcryptjs')

const usersController = {

    login: (req, res) => {
        return res.render("login");
    },

    procesarLogin: (req, res) => {
        let info = req.body;

        res.send(info.name)
        /*
        user.findOne({
            where: [{email: info.email}]
        }).then((result)=> {
            if (result != null) {
                let claveCorrecta =  bcryptjs.compareSync(info.password , result.password)


                return res.send ("Existe el mail " + info.email)
            } else {
                return res.send("No existe el mail " + info.email )
            }
          
        };
          */

    },

    register: function (req, res) {
        return res.render('register', {
            listaUsuarios: modulos.usuarios

        })
    },

    procesarRegister: function (req, res) {
        let info = req.body;
    
        let passEncriptada = bcryptjs.hashSync(info.password, 10)
            let usuarioParaGuardar = {
                name: info.name,
                email: info.email,
                password: passEncriptada,
                /* 
                remember_token: ,
                created_at: ,
                updated_at: ,
                */
               
            }
    
        user.create(usuarioParaGuardar).then((result) => {
            return res.redirect("user/login")
        })
    },

    profile: function (req, res) {
        res.render('profile', {
            titulo: modulos.usuarios,
            img: modulos.usuarios,
            usuario: modulos.usuarios,
            producto: modulos.productos
        })
    },
    profileEdit: function (req, res) {

        res.render('profile-edit', {
            info: modulos.usuario,
            img: modulos.usuarios,
            usuario: modulos.usuarios,
            producto: modulos.productos
        })

        res.render('profile-edit', { 
            info : modulos.usuario,
            img : modulos.usuarios,
            usuario : modulos.usuarios,
            producto : modulos.productos
         })
    },

    productAdd: function (req, res) {
        res.render('product-add', {
            usuario: modulos.usuarios
        })
    },

};



module.exports = usersController;
>>>>>>> a6c7c644b227f200d7a5e9d3fff31e123363ba3e
