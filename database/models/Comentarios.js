const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) => {

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        texto: {
            type: dataTypes.STRING,
        },
        id_product: {
            type: dataTypes.INTEGER
        },
        id_usuarios: {
            type: dataTypes.INTEGER
        },

    };

    let config = {
        tableName: "comentarios",
        timeStamps: false,
        underscored: true
    };

    const Comentario = sequelize.define('Comentario', cols, config);
    
    Comentario.associate = (models) => {
        Comentario.belongsTo(models.Producto, {
            as: "comentariosProductos",
            foreignKey: "usuarios_id"
        })

            Comentario.belongsTo(models.Usuario, {
                as: "comentarioUsuario",
                foreignKey: "usuarios_id"
            })
    }
    return Comentario;


};