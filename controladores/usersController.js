
const db = require('../database/models') //objeto db del sequelize donde se requieren los modelos
const productos = db.Producto //de todos los modelos pido uno en especifico (a  traves del alias)
const users = db.User
const comments = db.Comment
const userFollowers = db.UserFollower
const op = db.Sequelize.Op; //contiene los operadores para usar operadores de sequelize
const bcrypt = require('bcryptjs');
let data = require('../data/modelos');

const usersController = {

    /*  LOGIN Y LOGOUT  */
    login: function (req, res) {
        return res.render('login')
    },

    procesarLogin: function (req, res) {
        users.findOne({
            where: [{ email: req.body.email }]  //le indicamos 
        })
            .then(function (user) {  //si trajo un usuario hay que chequear la contraseña con compareSync()

                //Si las contraseñas no coincuiden mandamos mensaje de error.

                console.log(req.body) //info que trae el form
                console.log('el usuario es: ' + user);

                if (user != undefined) {
                    console.log('entro al if(user)');
                    let PasswordCorrecta = bcrypt.compareSync(req.body.password, user.password);
                    if (PasswordCorrecta) {
                        //Si el usuario tildó recordarme creo la cookie
                        if (req.body.remember) {
                            res.cookie('userId', user.dataValues.id, { maxAge: 1000 * 60 * 100 }); //3 parametros
                        }
                        console.log('coinciden');
                        req.session.user = user.dataValues;
                        res.locals.errores = '';
                        console.log('los errores son' + res.locals.errores);
                        return res.redirect('/index'); //+ user.dataValues.id
                    } else {
                        res.locals.errores = { mensaje: "La contraseña es incorrecta." };
                        console.log('los errores son' + res.locals.errores);
                        return res.render('login');
                    }

                } else {
                    res.locals.errores = { mensaje: "El email es incorrecto." }
                    console.log(res.locals.errores);
                    return res.render('login');
                }
            })
            .catch(error => console.log(error))
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("userId");
        return res.redirect("/index",);
    },
    /*  REGISTRO  */

    register: function (req, res) {
        if (req.session.user) {
            res.redirect("/index")
        }
        return res.render('register');
    },

    storeProfile: function (req, res) {
        let info = req.body;
        let image = req.file
        let errors = {};
        let filtro1 = {where: [{ email: req.body.email }]}


        if (info.name == "") {
            res.locals.errors = {message:"Falto nombre"}
            return res.render('register')

        } else if (info.email == ""){
            res.locals.errors = {message:"Falto email"}
            return res.render('register')

        }  else if (info.password == ""){
            res.locals.errors = {message:"Falto contrasena"}
            return res.render('register')

        } else if (info.password.length < 3) {
            res.locals.errors = {message:"La contrasena debe ser mayor a 3 caracteres"}
          return res.render('register')
        } else if (info.date == '') {
            res.locals.errors = {message:"Fecha de nacimiento falto"}
            return res.render('register')
        } else if (image == undefined) {
            res.locals.errors = {message:"Es obligatoria la imagen de perfil"}
            console.log(image)
            return res.render('register')
        }
        else  { 
            users.findOne(filtro1)
            .then(result => {
                if (result != undefined){
                    console.log(info)
                    res.locals.errors = {message:"El mail ya existe"}
                    return res.render('register');
                } 


                else {
                    let usuario = {
                        email: info.email,
                        username: info.name,
                        password: bcrypt.hashSync(info.password, 10),
                        date: info.date,
                        image: `/images/users/${req.file.filename}`,
                        created_at: new Date(),
                    }

                    users.create(usuario)
                        .then(resultado => res.redirect("/users/login"))
                        .catch(err => console.log(err));

                }
            })

        }
    },
    perfil: function (req,res){
       
        if (res.locals.user) {
            let info = {
                usuario: null,
                productos: null,
                comentarios: null
            };
            users.findOne({
                where: [{id: req.params.id}]
            })
            .then(function(usuario){
                comments.findAll({
                    where: [{FkUserId: req.params.id}]
                })
                .then(function(comentarios){
                    productos.findAll({
                        where: [{FkUserId: req.params.id}]
    
                    })
                    .then(function(zapas){
                        userFollowers.findAll({
                            where: [{FkUserId: req.params.id}]
                        })
                        .then(function(seguidores){
                            userFollowers.findOne({
                                where: [{FkUserId: req.params.id},{FkFollowerId: res.locals.user.id}] 
                            })
                            .then(function(yaSigue){
                                info.productos = zapas;
                                info.usuario = usuario;
                                info.comentarios = comentarios;
                                info.seguidores = seguidores; 
                                info.yaSigue = yaSigue;
                                //return res.send(info);
                                return res.render('profile', {info: info, id: req.params.id});//datos de un usuario y todos sus zapatillas
                            })
                        })
                    })
                })
            })
        } else {
 
            let info = {
                usuario: null,
                productos: null,
                comentarios: null
            };
            users.findOne({
                where: [{id: req.params.id}]
            })
            .then(function(usuario){
                comments.findAll({
                    where: [{FkUserId: req.params.id}]
                })
                .then(function(comentarios){
                    productos.findAll({
                        where: [{FkUserId: req.params.id}]
    
                    })
                    .then(function(zapas){
                        userFollowers.findAll({
                            where: [{FkUserId: req.params.id}]
                        })
                        .then(function(seguidores){
                            userFollowers.findOne({
                                where: [{FkUserId: req.params.id}] 
                            })
                            .then(function(yaSigue){
                                info.productos = zapas;
                                info.usuario = usuario;
                                info.comentarios = comentarios;
                                info.seguidores = seguidores; 
                                info.yaSigue = yaSigue;
                                //return res.send(info);
                                return res.render('profile', {info: info, id: req.params.id});//datos de un usuario y todos sus zapatillas
                            })
                        })
                    })
                })
            })
        }


      

    },

    edit: function (req,res){
        if (!req.session.user){
            res.redirect("/index" )
        }
        let id = req.params.id;
        users.findOne({
            where: [{id: id}]
        })
        .then(function(usuario){
            //return res.send(usuario);
            return res.render('profile-edit', {info: usuario});
        })

    },

    editProfile: (req,res)=>{
        var image;

          
        if (req.file){
            image = req.file.filename
            console.log(req.file);
        } else {

            image = '/images/users/default-image.jpg'
        }
        let user = {
            email: req.body.email,
            username:req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            date: req.body.date,
            image: `/images/users/${image}`,
            createdAt: req.body.createdAt
        }
        //pegar datos a bd
        users.update(user,{
            where:{
                id:req.body.id
            }
        }) //create agarra el objeto, se lo manda a la table en la bd y cuando esta lo guarda, devuelve el registro como parametro de la funcion del then
            .then(function(respuesta){  //en el parametro recibimos el registro que se acaba de crear en la base de datos
                //return res.send(req.body.id)
                res.redirect('/users/profile/'+req.body.id); //redirigir falta ponerle el id del usuario en cuestion -> session
            })
            .catch(error => console.log (error))
    },
    storeFollower:function (req, res) {
        //res.send(req.body)
        let follower = {
            FkUserId: req.body.usuarioSeguido,
            FkFollowerId: req.body.usuarioSeguidor
        }
        if(req.body.seguido == 1) {
            userFollowers.create(follower)
            .then(function(respuesta){  //en el parametro recibimos el registro que se acaba de crear en la base de datos
           
                return res.redirect(`/users/profile/${req.body.usuarioSeguido}`); //redirigir falta ponerle el id del usuario en cuestion -> session
            })
        }
        if(req.body.seguido == 0) {
            userFollowers.destroy({
                where: [{FkUserId: req.body.usuarioSeguido},{FkFollowerId: req.body.usuarioSeguidor}] 
            })
            .then(function(respuesta){  //en el parametro recibimos el registro que se acaba de crear en la base de datos
              

                return res.redirect(`/users/profile/${req.body.usuarioSeguido}`); //redirigir falta ponerle el id del usuario en cuestion -> session
            })
        }

        
    },
    showProductAdd: function (req, res) {

        return res.render('product-add', {info: data});
    },
    store:function(req,res){
        var image;
        if (req.file){

            image = req.file.filename

        } else {
            image = '/images/products/default-image.jpg'
        }
        //res.send (req.body)
        let zapa = {
            id: req.params.id,
            image: `/images/users/${image}`,
            model: req.body.model,
            brand: req.body.brand,
            year: req.body.year,
            color: req.body.color,
            size: req.body.size,
            createdAt: req.body.createdAt,
            updatedAt: new Date(),
            FkUserId: req.body.FkUserId,
        }

        productos.create(zapa)
        .then(function() {
            return res.redirect('/index')
        })
    },
 }
   


module.exports = usersController;
