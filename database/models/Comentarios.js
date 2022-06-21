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

    const comentarios = sequelize.define('comentario', cols, config);
    comentarios.associate = (models) => {
        comentarios.belongsTo(models.productos, {
            as: "comentarios_productos",
            foreignKey: "usuarios_id"

        })

    }
    return comentarios;


};