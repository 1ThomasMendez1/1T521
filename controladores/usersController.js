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
