var express = require('express');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const session = require('express-session');
const db = require('./database/models')
const users = db.User

var indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let productsRouter = require('./routes/products')





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Configurando Session, mensaje secreto
app.use(session({
  secret:"pebeteHype",
  resave: false,
  saveUninitialized:true
}));

//Pasar los datos de session a locals
app.use(function(req, res, next){
  if(req.session.user != undefined){
    res.locals.user = req.session.user
  }
  return next();
})

//Pregunto por la cookie
app.use(function(req, res, next){
  if(req.cookies.userId != undefined && req.session.user == undefined ){
    let userId = req.cookies.userId;
    //Tengo que ir a la db y hacer una consulta
    users.findByPk(userId)
      .then(function(user){
          req.session.user = user.dataValues
          res.locals.user = user.dataValues
          return next();
      })
      .catch(error => console.log(error))
  } else {
    return next();
  }
    
})

app.use('/index', indexRouter)
app.use('/users', usersRouter) 
app.use('/products', productsRouter)

//cuando se solicite cualquier recurso, el mismo va a ser atendido por el modulo creado
//metodo use que pertenece a express --> en app.js van unicamente los prefijos. 
//app.use('/products', productsRouter)
//el metodo use() recibe dos parametros, siendo el primero un string que seria el nombre del recurso. 
// y el segundo será el nombre de la constante en la que almacenemos el modulo del recurso
//app.use('/users', profileRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;