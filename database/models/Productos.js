module.exports = (sequelize, dataTypes) => {

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titulo: {
            type: dataTypes.STRING
        },
        imagen_producto: {
            type: dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.STRING
        },
        fecha_creacion: {
            type: dataTypes.DATE
        },
    }
    let config = {
        tablename: 'productos',
        timestamps: true,
        underscored: true,
    };

    const Producto = sequelize.define('Producto', cols, config);

    Producto.associate = (models) => {
        Producto.belongTo(models.Usuario, {
            as: "usuarios_productos",
            foreignKey: "usuarios_id"
        })

        Producto.hasMany(models.Comentario, {
            as: "comentarios_productos",
            foreignKey: "productos_id"
        })
    }
    return Producto;


}