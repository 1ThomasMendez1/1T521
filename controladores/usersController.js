
const db = require('../database/models') //objeto db del sequelize donde se requieren los modelos
const productos = db.Producto //de todos los modelos pido uno en especifico (a  traves del alias)
const users = db.User
const comments = db.Comment
const userFollowers = db.UserFollower
const op = db.Sequelize.Op; //contiene los operadores para usar operadores de sequelize
const bcrypt = require('bcryptjs');


const usersController = {
    register: function (req,res){
        return res.render('register');
    },
    login : function(req,res) {
            res.redirect("/index" )
        return res.render('login');
    },
    storeProfile: function (req, res) {
        let info = req.body;
        let errors = {};
        let filtro1 = {where: [{ email: req.body.email }]} //operador del sequelize que viene en op


        if (info.name == "") {
            errors.message = "El input de nombre esta vacio";
            res.locals.errors = errors;
            return res.render('register')
            
        } else if (info.email == ""){
            errors.message = "El input de email esta vacio";
            res.locals.errors = errors;
            return res.render('register')

        }  else if (info.password == ""){
            errors.message = "El input de password esta vacio";
            res.locals.errors = errors;
            return res.render('register')

        } else if (info.password.length < 3) {
          errors.message = "El input de password era menor de 3 caracteres"
          res.locals.errors = errors;
          return res.render('register')
        } else if (info.date == '') {
            errors.message = "Fecha de nacimiento por favor"
            res.locals.errors = errors;
            return res.render('register')
        } else if (info.imgPerfil == '') {
            errors.message = "Es obligatorio que elija una imagen de perfil"
            res.locals.errors = errors;
            return res.render('register')
        }
        else  { 
            users.findOne(filtro1)
            .then(result => {
                if (result != undefined){
                    console.log(info)
                    errors.message = "El mail ya existe";
                    res.locals.errors = errors;
                    return res.render('register');
                } 
                
                
                else {
                    let usuario = {
                        email: info.email,
                        username: info.username,
                        password: bcrypt.hashSync(info.password, 10),
                        date: info.date,
                        image: `/images/users/${req.file.filename}`,
                        created_at: new Date(),
                    }
            
                    users.create(usuario)
                        .then(resultado => res.redirect("/users/login"))
                        .catch(err => console.log(err));
                   
                }
            })
        
        }
    },
}

module.exports = usersController;