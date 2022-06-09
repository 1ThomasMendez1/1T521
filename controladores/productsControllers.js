<<<<<<< HEAD
const modulos = require("../db/modulos");



const productsControllers = {
    index: function (req, res) {
      
        res.render('products', {
            listaZapas: modulos.productos,
            listaComentarios: modulos.comentarios,
            imagen : modulos.addPro
        })
    }, 

    productAdd: function (req, res) {
        res.render('product-add', {
          usuario : modulos.usuarios
        })
    },
    searchResults: function (req, res) {
        return res.render('search-results', {
        })
    }
    }


=======
const modulos = require("../db/modulos");



const productsControllers = {
    index: function (req, res) {
      
        res.render('products', {
            listaZapas: modulos.productos,
            listaComentarios: modulos.comentarios,
            imagen : modulos.addPro
        })
    }, 

    productAdd: function (req, res) {
        res.render('product-add', {
          usuario : modulos.usuarios
        })
    },
    searchResults: function (req, res) {
        return res.render('search-results', {
        })
    }
    }


>>>>>>> f9d5ac8de8da507128fa54f38051a7c3f8c1c046
module.exports = productsControllers; 