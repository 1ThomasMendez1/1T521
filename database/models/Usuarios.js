module.exports = (sequelize, dataTypes) => {
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_usuario: {
            type: dataTypes.STRING,

        },
        fecha_nacimiento: {
            type: dataTypes.DATE,

        },
        contrasenia: {
            type: dataTypes.STRING,

        },
        email: {
            type: dataTypes.STRING,
        }
    }
    let config = {
        tablename: 'usuarios',
        timestamps: true,
        underscored: true,
    }

    let Usuario = sequelize.define("Usuario", cols, config)

    Usuario.associate = (models) => {
        Usuario.hasMany(models.Producto, {
            as: "productosUsuarios", //se usa en las viustas
            foreignKey: "usuarios_id"
        })
        Usuario.hasMany(models.Comentario,{
            as: "comentariosUsuario",
            foreignKey: "usuarios_id"
        })
        Usuario.hasMany(models.Seguidor,{
            as: "Seguidores",
            foreignKey: "usuarios_seguidores_id"
        })
        Usuario.hasMany(models.Seguidor,{
            as: "Seguidos",
            foreignKey: "usuarios_seguidos_id"
        })
       

        return Usuario
        }

//usuario alias del modelo table name nombre de la tabla


}