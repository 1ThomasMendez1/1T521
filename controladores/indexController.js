const db = require("../database/models"); //Requiero los modulos de la base de datos, y los almaceno en db
const op = db.Sequelize.Op //Requiero los operadores Sequelize y los almaceno en OP.
const productos = db.Producto




const indexController = {
 
    home: (req, res) => { //metodo
      productos.findAll ({
          include : [{association: 'owner'}, {association: 'comentarios'}], //cada objeto literal es una relacion su valor es el mismo alias que asignamos a la relacion
          order : [['createdAt', 'DESC']],
          limit: 4  })
      .then(function(zapatillas){
       productos.findAll ({
           include: [{association: 'owner'}, {association: 'comentarios'}],
           limit: 4
       })
       .then(function(zapatillas2){
           for(let i = 0; i < zapatillas2.length; i++){
               zapatillas.push(zapatillas2[i])
           }
           return res.render('index', {info: zapatillas} )
           
       })
       
      })
},
search: function(req,res) {
    productos.findAll ({
        include:[{association: 'owner'}, {association: 'comentarios'}],
        where: [{ model: {[op.like]: '%' + req.query.search + '%'}
    }] //model refiere a la columna model de la base de datos, de esta forma tambien podriamos filtrar por usernmame por ejemplo
    })

    .then(function (zapatillas){
        productos.findAll ({
            include:[{association: 'owner'}, {association: 'comentarios'}],
            where: [{brand: {[op.like]: '%' + req.query.search + '%'}}] //operador or usar 
        })
        .then(function(zapatillas2){
            for(let i = 0; i < zapatillas2.length; i++){
                zapatillas.push(zapatillas2[i])
            }
            productos.findAll ({
                include:[{association: 'owner'}, {association: 'comentarios'}],
                where: [{year: {[op.like]: '%' + req.query.search + '%'}}] 
            })
            .then(function(zapatillas3){
                for(let i = 0; i < zapatillas3.length; i++){
                    zapatillas.push(zapatillas3[i])
                }
                productos.findAll ({
                    include:[{association: 'owner'}, {association: 'comentarios'}],
                    where: [{color: {[op.like]: '%' + req.query.search + '%'}}] 
                })

                    .then(function(zapatillas5){
                        for(let i = 0; i < zapatillas5.length; i++){
                            zapatillas.push(zapatillas5[i])
                        }
                        productos.findAll ({
                            include:[{association: 'owner'}, {association: 'comentarios'}],
                            where: [{size: {[op.like]: '%' + req.query.search + '%'}}]
                        })
                        .then(function(zapatillas6){
                            for(let i = 0; i < zapatillas6.length; i++){
                                zapatillas.push(zapatillas6[i])
                            }
                            return res.render('search-results', {info: zapatillas, query: req.query.search});
                        })
                    })
                })
            })
        })
           
    .catch(error => console.log('El error: ' + error))
  },
  profileEdit: (req, res) =>{
    idUsuario = req.params.id,
    db.User.findByPk(idUsuario)

    .then((result) =>{
        return res.render('profile-edit',{
 info: result  })
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





