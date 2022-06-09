const modulos = require("../db/modulos");




const usersController = {

    register: function (req, res) {
        return res.render('register', {
            listaUsuarios: modulos.usuarios
        })
    },

    login: function (req, res) {
        return res.render('login') 
        },
    
    profile: function (req, res) {
        res.render('profile', {  
            titulo: modulos.usuarios,
            img : modulos.usuarios, 
            usuario : modulos.usuarios,
            producto : modulos.productos
        })
    },
    profileEdit: function (req, res) {
        res.render('profile-edit', { 
            info : modulos.usuario,
            img : modulos.usuarios,
            usuario : modulos.usuarios,
            producto : modulos.productos
         })
    }
};



module.exports = usersController;