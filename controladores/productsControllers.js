<<<<<<< HEAD

=======
const modulos = require("../database/modulos");
>>>>>>> a6c7c644b227f200d7a5e9d3fff31e123363ba3e



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
