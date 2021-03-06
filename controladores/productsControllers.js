
const { escapeRegExpChars } = require('ejs/lib/utils');
const db = require('../database/models');
const productos = db.Producto
const op = db.Sequelize.Op
const comments = db.Comment
const users = db.User
let data = require('../data/modelos');

const productsControllers = {
    show: function (req,res){
        db.Producto.findOne({
               where: [{id: req.params.id}],
               include: [{association: 'owner'}, {association: 'comentarios'}],
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
    deleteProduct: (req, res) => {
        let id = req.params.id
        let info = req.body
        let zapas = {
            users_id : info.users_id
        }
        if (req.session.user.id == zapas.users_id) {
            productos.destroy({
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
    },
    edit:function(req,res){
        productos.findByPk(req.params.id)
        .then(productos=>{

            res.render("product-edit",{
                info:productos
            })
        })
        
    },
    update:function(req,res){
        var image;
        if (req.file){
           
            image = req.file.filename

        } else {

            image = '/images/products/default-image.jpg'
        }
        //res.send (req.body)
        let zapa = {
            id: req.params.id,
            image: `/images/products/${image}`,
            model: req.body.model,
            brand: req.body.brand,
            year: req.body.year,
            color: req.body.color,
            size: req.body.size,
            createdAt: req.body.createdAt,
            updatedAt: new Date(),
            FkUserId: req.body.FkUserId,
        }
       
        productos.update(zapa,{where:{id:req.params.id}})
        .then(function() {
            return res.redirect('/products/'+req.params.id)
        })
    },


};

module.exports = productsControllers;
