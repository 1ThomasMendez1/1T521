var express = require('express');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index.js')
const usersRouter = require('./routes/users') //aqui requiero  el archivo de ruteo que se va a encargar
// de manejar los recurso solicitados posteriormente
const movieRouter = require('./routes/movies')
const productsRouter =require('./routes/products');
const productsControllers = require('./controladores/productsControllers')

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/users', usersRouter) //cuando se solicite cualquier recurso, el mismo va a ser atendido por el modulo creado
//metodo use que pertenece a express --> en app.js van unicamente los prefijos. 
app.use('/products', productsRouter)
//el metodo use() recibe dos parametros, siendo el primero un string que seria el nombre del recurso. 
// y el segundo será el nombre de la constante en la que almacenemos el modulo del recurso
app.use('/', movieRouter)
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
