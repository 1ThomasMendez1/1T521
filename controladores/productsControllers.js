
const { escapeRegExpChars } = require('ejs/lib/utils');
const db = require('../database/models');
const productos = db.Producto
const op = db.Sequelize.Op
const comments = db.Comment
const users = db.User

const productsControllers = {
    show: function (req,res){
        db.Producto.findOne({
               where: [{id: req.params.id}],
               include: [{association: 'owner'}, {association: 'comentarios'}],
               //order: ['comentarios', 'order', 'desc']
           })
         
               .then(function(unProducto){
                   let comentarios = [];
                   //return res.send(unProducto.comentarios)
                   for(let i = 0; i < unProducto.comentarios.length; i++){
                       comentarios.push(unProducto.comentarios[i])
                   }
                   //return res.send(comentarios);
                   let comentariosOrdenados = comentarios.sort((a,b) => b.createdAt - a.createdAt);//como la consigna pide que los comentarios esten en orden descendiente ordenados por createdAt, con esta linea resolvemos esto
                   //return res.send(comentariosOrdenados)
                   unProducto.comentarios = comentariosOrdenados;
                   //return res.send(unProducto)
   
                   let comentadores = [];
                   if(unProducto.comentarios[0] != undefined){
                       //return res.send('hay comentarios')
                       for(let i = 0; i < unProducto.comentarios.length; i++){
                           users.findOne({
                               where: [{id: unProducto.comentarios[i].FkUserId}]
                           })
                           .then(function(unComentador){
                               comentadores.push(unComentador);
                               if(i == unProducto.comentarios.length - 1){
                                   //return res.send(comentadores)
                                   return res.render('products', {info: unProducto, comentadores: comentadores, id: req.params.id});
                               }
                           })
                       }
                   } else {
                       //return res.send(unProducto)
                       return res.render('products', {info: unProducto, comentadores: [], id: req.params.id});
                   }
                   //return res.send(unProducto)
                   
               })
           //return res.render('product', {info: data, array: array, id: req.params.id});
       },
  
    showProductAdd: function (req, res) {


        idProducto = req.params.id //almaceno el id que viene con la url
        idUsuario = req.session.user.id //almaceno el id del usuario que esta logeado
        datosProducto = req.body //extraigo los datos del form

        if (req.file == undefined) { //en el caso de que el usuario no haya guardado foto
            fotoProducto = null
        } else {
            fotoProducto = req.file.filename; //llamo fotoProducto al nombre del archivo subido por el usuario
        }
        db.Producto.create({ //creo el nuevo registro en la tabla de productos
            nombreProducto: datosProducto.nombreProducto,
            imagen: fotoProducto,
            descripcion: datosProducto.descripcion,
            idUsuario: idUsuario
        })
        .then ((result) =>{
            res.redirect("/profile/" + idUsuario)
        })
            
        //image es el nombre del campo del formulario que carga la imagen
        //para que venga el req.file primero le pusimos al formulario el enctype="multipart/form-data" 
        //en req.file hay muchas propiedades y la mas importante es el path que tiene la ruta completa en donde esta el archivo
        //el path lo aclaramos nosotoros en la carpeta destin   ation en la ruta   
    },

    store: (req, res) => {
        let info = req.body;
        let imgProduct = req.file.filename;
        let zapas = {
            photo: imgProduct,
            model: info.model,
            description: info.description,
            users_id: req.session.user.id
        };


        product.create(zapas)
            .then((result) => {
                return res.redirect('/')
            }).catch((err) => {
                return res.send('Hay un error' + err)
            });

    },
    showProductEdit: (req, res) => {
        let id = req.params.id;
        let filtro = {
            include : {
                all: true,
                nested: true
            }
        }
        product.findByPk(id, filtro).then((result) => {
            return res.render('product-edit', { product: result.dataValues })
        }).catch((err) => {
            console.log(err);
        });
    },
    updateProduct: (req, res) => {
            let info = req.body;
            let imgProduct = req.file.filename;
            let zapas = {
                photo: imgProduct,
                model: info.model,
                description: info.description,
                users_id: info.users_id
            }
    
            let filtro = {
                where: {
                    id: req.params.id
                }
            };

            if(req.session.user.id == zapas.users_id) {
            product.update(zapas, filtro)
            .then((result) => {
                console.log(zapas.users_id);
                console.log(zapas.users_id);
                return res.redirect('/')
            }).catch((err) => {
                console.log(err);
            });
            }
            else {
                console.log(zapas.users_id);
                console.log(zapas.users_id);
                return res.redirect('/profile/login')
            }
    
        
    },
    deleteProduct: (req, res) => {
        let id = req.params.id
        let info = req.body
        let zapas = {
            users_id : info.users_id
        }
        if (req.session.user.id == zapas.users_id) {
            product.destroy({
                where: {
                    id: id
                }
            }).then((result) => {
                return res.redirect('/')
            }).catch((err) => {
                res.send(err)
            });
        }
        else {
            return res.redirect('/profile/login')
        }
      
    },
    comments: (req, res) => {
        if (req.session.user == undefined) {
            res.redirect('/profile/login')
           
        
        } 
        let info = req.body
        let comentario = {
            comentario: info.comentario,
            products_id: req.params.id,
            users_id: req.session.user.id,
        }
        comments.create(comentario)
        .then((result) => {
            return res.redirect('/products/id/' + req.params.id)
        }).catch((err) => {
            console.log(err);
        });
       
    },
    storeComment: function (req, res){
        console.log(req.body);
        if(req.body.text==""){
            res.redirect('/product/' + req.body.FkProductoId);
            
        }else{
        let comment = {
            text: req.body.text,
            rating: req.body.rating,
            FkUserId: req.body.FkUserId,
            FkProductoId: req.body.FkProductoId
        }
        console.log(comment)
        comments.create(comment)
        .then(function(){

            comments.findAll({
                where: [{FkProductoId: comment.FkProductoId}]
            })
            .then(function(todos){
    
                productos.findOne({
                    where: [{id: comment.FkProductoId}],
                    order : [['createdAt', 'DESC']]
                })
                .then(function(result){
                    let zapatilla = {
                        id: result.id,
                        image: result.image,
                        model: result.model,
                        brand: result.brand,
                        year: result.year,
                        color: result.color,
                        size: result.size,
                        FkUserId: result.FkUserId,
                    }
                    productos.update(zapatilla, {
                        where: [{id: comment.FkProductoId}]
                    })
                    .then(function(){
                        return res.redirect(`/products/${zapatilla.id}`);
                    })
                })
            })
        })}
    }

};

module.exports = productsControllers;
