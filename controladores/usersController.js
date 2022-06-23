
const db = require('../database/models')
const productos = db.Producto
const users = db.User
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

    signIn: function(req, res){
        console.log("entre al sign in");
        users.findOne({
            where: [{email: req.body.email}]
        })
            .then(function(user){
                //si trajo un usuario hay que chequear la contraseña con compareSync()
                //Si las contraseñas no coincuiden mandamos mensaje de error.
                console.log(req.body)
                console.log('el usuario es: ' + user);

                if(user){
                    console.log('entro al if(user)');
                    if(bcrypt.compareSync(req.body.password, user.password)){
                        //Si el usuario tildó recordarme creo la cookie
                        if (req.body.remember) {
                            res.cookie('userId',user.dataValues.id,{maxAge: 1000*60*100} );
                        } 
                        console.log('coinciden');
                        req.session.user = user.dataValues;
                        res.locals.errores = ''
                        console.log('los errores son' + res.locals.errores);
                        return res.redirect('/profile/' + user.dataValues.id)
                    } else {
                        res.locals.errores = {mensaje:"la password no concide"};
                        console.log('los errores son' + res.locals.errores);
                        return res.render('login')
                    }

                } else{
                    res.locals.errores ={mensaje:"El email es incorrecto"} 
                    console.log(res.locals.errores);
                    return res.render('login')
                }
            })
            .catch(error => console.log(error))
        },
        logout : (req, res) => {
            req.session.destroy();
            res.clearCookie("userId")
            return res.redirect("/index",);
        },
}

module.exports = usersController;
