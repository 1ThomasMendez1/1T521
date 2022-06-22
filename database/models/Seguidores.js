module.exports = function (sequelize, dataTypes){

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER

        },
        id_seguidor: {
            type: dataTypes.INTEGER
        },
        id_seguido: {
            type: dataTypes.INTEGER
        }
    }


    let config = {
        tableName: 'seguidores',
        timestamps: true,
        underscored: true
    };
    const Seguidor  = sequelize.define("Seguidor", cols, config);
    Seguidor.associate = (models) => {
        Seguidor.belongsTo(models.Usuario, {
            as: "seguidoresUsuario", //se usa en las viustas
            foreignKey: "usuarios_seguidores_id"
        })
        Seguidor.belongsTo(models.Usuario, {
            as: "seguidosUsuario", //se usa en las viustas
            foreignKey: "usuarios_seguidos_id"
        })

    }

    

    return Seguidor;
}
