const modulos = require("../db/modulos");

const indexController = {
    index: function (req, res) {
        return res.render('index', {
            
            listaZapas: modulos.productos,
            listaComentarios: modulos.comentarios,
            listaUsuarios: modulos.usuarios

        });
    },
   
}



module.exports = indexController;