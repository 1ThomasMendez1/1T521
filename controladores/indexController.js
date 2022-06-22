const db = require("../database/models"); //Requiero los modulos de la base de datos, y los almaceno en db
const op = db.sequelize.op //Requiero los operadores Sequelize y los almaceno en OP.
const productos = db.Productos

const indexController = {
 
    home: (req, res) => {
      return res.render('index') 

}
}
module.exports = indexController








































/*
 
 
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
 
    */





