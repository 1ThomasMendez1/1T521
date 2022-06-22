
const db = require('../database/models')
const productos = db.Producto
const user = db.User
const comments = db.Comment
const userFollowers = db.UserFollower
const op = db.Sequelize.Op;

const bcrypt = require('bcryptjs');

const multer = require('multer');
const path = require('path');
const { dirname } = require('path');

const usersController = {
    register: function (req,res){
        if (req.session.user){
            res.redirect("/index" )
        }
        return res.render('register');
    },
    login : function(req,res) {
       return res.render('login')
    },

    procesarLogin : function(req,res) {
        let info = req.body;

        let errors = {};

       if (info.mail == "") {
        errors.message = "El input de email esta vacio";
            res.locals.errors = errors;
            return res.render('login');
    
       } else if (info.password == "") {
        errors.message = "El input de password esta vacio";
        res.locals.errors = errors;
        return res.render('login')

       } else {
        user.findOne({
            where : [{ email :  info.email}]
        }).then((result) => {
            if (result != null) {
                let claveCorrecta = bcryptjs.compareSync(info.password  , result.password )
                if (claveCorrecta) {
                    req.session.user = result.dataValues;
                    console.log(req.session.user);
                    /* Evaluar si el checkbox esta en true o existe */

                    if (req.body.remember != undefined) {
                        res.cookie('userId', req.session.user.id, { maxAge : 1000 * 60 * 5})
                    }
                    return res.redirect("/index")
                } else {
                    /* Este paso se ejecuta por cada validacion que queramos */
                    errors.message = "La clave es incorrecta"
                    res.locals.errors = errors;
                    return res.render('login');
                }
                
            } else {
                /* Este paso se ejecuta por cada validacion que queramos */
                errors.message = "No existe el email " + info.email
                res.locals.errors = errors;
                return res.render('login');
            }
        });
       }
    }
}


module.exports = usersController;
