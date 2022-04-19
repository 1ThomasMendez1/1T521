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


module.exports = productsControllers; 