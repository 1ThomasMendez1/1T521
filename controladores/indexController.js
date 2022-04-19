const modulos = require("../db/modulos");

const indexController = {
    index: function (req, res) {
        return res.render('index', {
            
            listaZapas: modulos.productos,
            listaComentarios: modulos.comentarios,
            listaUsuarios: modulos.usuarios,
            lanzamiento : modulos.productos

        })
        },
        show : function(req, res){
            return res.render('indexLogin', {
                usuario: modulos.usuarios,
                titulo: modulos.productos,
                img: modulos.productos,
                descripcion: modulos.productos,
                contenido: modulos.comentarios,
                comentario: modulos.comentarios,
            })
    },
   
}



module.exports = indexController;