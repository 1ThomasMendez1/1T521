const modulos= require('../db/modulos');
const zapatillas =require('../db/modulos');

let usersController = {
    register: function (req, res) {
        return res.render('register')
    },

    login: function (req, res) {
        return res.render('login')
    },

    profile: function (req,res) {
        return res.render('profile', {usuarios: modulos.email, usuarios: modulos.usuario, usuarios: modulos.fotoDePerfil})
    },

    editarPerfil: function (req,res) {
        return res.render('profile-edit', {usuarios: modulos.email, usuarios: modulos.usuario, usuarios: modulos.fotoDePerfil})
    }

};



module.exports = usersController
