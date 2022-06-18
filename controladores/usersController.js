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