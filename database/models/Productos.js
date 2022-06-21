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
        timestamps: false,
        underscored: true,
    };

    const productos = sequelize.define('productos', cols, config);

    productos.associate = (models) => {
        productos.belongTo(models.usuarios, {
            as: "usuarios_productos",
            foreignKey: "usuarios_id"
        })

        productos.hasMany(models.comentarios, {
            as: "comentarios_productos",
            foreignKey: "productos_id"
        })
    }
    return productos;


}