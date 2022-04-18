const modulos = require("../db/modulos");



const productsControllers = {
    detail: function (req, res) {
      
        res.render('products', {
            listaZapas: modulos.productos,
            listaComentarios: modulos.comentarios,
            listaUsuarios : modulos.usuarios
        })
    },
    productAdd: function (req, res) {
        res.render('product-add', {
            listaZapas: modulos.productos,
            listaComentarios: modulos.comentarios,
        })
    },
    searchResults: function (req, res) {
        return res.render('search-results', {
            listaZapas: modulos.productos,
            listaComentarios: modulos.comentarios,
            listaUsuarios: modulos.usuarios
        })
    }
}

module.exports = productsControllers; 