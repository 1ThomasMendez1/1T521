const modulos = require("../db/modulos");




const usersController = {

    register: function (req, res) {
        return res.render('register', {
            listaUsuarios: modulos.usuarios
        })
    },

    login: function (req, res) {
        return res.render('login', {
            listaUsuarios: modulos.usuarios
        })
    },
    profile: function (req, res) {
        res.render('profile', {  
            listaUsuarios: modulos.usuarios, 
            listaProductos: modulos.productos, 
            listaComentarios: modulos.comentarios })
    },
    profileEdit: function (req, res) {
        res.render('profile-edit', { listaUsuarios: modulos.usuario })
    }
};



module.exports = usersController;