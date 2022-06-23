
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
const { Console } = require('console')

const usersController = {
    /*  LOGIN Y LOGOUT  */
    login: function (req, res) {
        return res.render('login')
    },

    procesarLogin: function (req, res) {
        users.findOne({ 
            where: [{ email: req.body.email }]  //le indicamos 
        })
            .then(function (user) {  //si trajo un usuario hay que chequear la contraseña con compareSync()

                //Si las contraseñas no coincuiden mandamos mensaje de error.

                console.log(req.body) //info que trae el form
                console.log('el usuario es: ' + user);

                if (user != undefined) {
                    console.log('entro al if(user)');
                    let PasswordCorrecta = bcrypt.compareSync(req.body.password, user.password);
                    if (PasswordCorrecta) {
                        //Si el usuario tildó recordarme creo la cookie
                        if (req.body.remember) {
                            res.cookie('userId', user.dataValues.id, { maxAge: 1000 * 60 * 100 }); //3 parametros
                        }
                        console.log('coinciden');
                        req.session.user = user.dataValues;
                        res.locals.errores = '';
                        console.log('los errores son' + res.locals.errores);
                        return res.redirect('/profile/' + user.dataValues.id);
                    } else {
                        res.locals.errores = { mensaje: "La contraseña es incorrecta." };
                        console.log('los errores son' + res.locals.errores);
                        return res.render('login');
                    }

                } else {
                    res.locals.errores = { mensaje: "El email es incorrecto." }
                    console.log(res.locals.errores);
                    return res.render('login');
                }
            })
            .catch(error => console.log(error))
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("userId");
        return res.redirect("/index",);
    },
    /*  REGISTRO  */

    register: function (req, res) {
        if (req.session.user) {
            res.redirect("/index")
        }
        return res.render('register');
    },

    storeProfile: function (req, res) {
        let info = req.body;
        let email = users.findOne({ where: [{ email: info.email }] })
        let errors = {};
        let filtro1 = { where: [{ email: req.body.email }] }
        let filtro2 = { where: [{ username: req.body.name }] }

        if (info.name == "") {
            errors.message = "El input de nombre esta vacio";
            res.locals.errors = errors;
            return res.render('register')

        } else if (info.email == "") {
            errors.message = "El input de email esta vacio";
            res.locals.errors = errors;
            return res.render('register')

        } else if (info.password == "") {
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
        else {
            users.findOne(filtro1)
                .then(result => {
                    if (result != undefined) {
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
                            image: `/images/users/${info.imgPerfil}`,
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
