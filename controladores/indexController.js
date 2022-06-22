const db = require("../database/models"); //Requiero los modulos de la base de datos, y los almaceno en db
const Producto = require("../database/models/Producto");
const op = db.Sequelize.Op //Requiero los operadores Sequelize y los almaceno en OP.
const productos = db.Producto
const usuarios = db.User
const comentarios = db.Comment



const indexController = {
 
    home: (req, res) => {
      productos.findAll ({
          include : [{association: 'owner'}, {association: 'comentarios'}],
          order : [['createdAt', 'DESC']],
          limit: 4
      })
      .then(function(zapatillas){
       productos.findAll ({
           include: [{association: 'owner'}, {association: 'comentarios'}],
           limit: 4
       })
       .then(function(zapatillas2){
           for(let i = 0; i < zapatillas2.length; i++){
               zapatillas.push(zapatillas2[i])
           }
           return res.render('index', {info: zapatillas })
       })
      })
},


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





