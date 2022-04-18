const modulos= require('../db/modulos');
const zapatillas =require('../db/modulos');

let usersController = {
    register: function (req, res) {
        return res.render('register') //aqui le indicamos que cada vez que escuche '/register'
        //el ".get" es el método http que queremos atender puede ser tambien por ejemplo post.
    },

    login: function (req, res) {
        return res.render('login') //dentro del parentesis encontramos un string y hace referenci
        //a la ruta en si misma (url que llega por peticion)
    },

    profile: function (req,res) { //separado por coma encontramos el handler, es un callback que se encargara de tomar acción 
    //cuando se acceda a la ruta definida.
        return res.render('profile', {usuarios: modulos.email, usuarios: modulos.usuario, usuarios: modulos.fotoDePerfil})
        
    },

    editarPerfil: function (req,res) {
        return res.render('profile-edit', {usuarios: modulos.email, usuarios: modulos.usuario, usuarios: modulos.fotoDePerfil})
    } //luego encontramos dentro del bloque de codigo el cuerpo del handler

};



module.exports = usersController
