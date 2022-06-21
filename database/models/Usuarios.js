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

    let usuarios = sequelize.define(alias, cols, config)

    usuarios.associate = (models) => {
        usuarios.hasMany(models.productos, {
            as: "productos_usuarios",
            foreignKey: "usuarios_id"
        })

        return usuarios
    }




}