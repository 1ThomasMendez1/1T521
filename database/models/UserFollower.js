module.exports = function (Sequelize,DataTypes){ //el modelo exporta una funcion
    
    //definir un alias que va a ser el nombre con el que vamos a llamar al modelo cuando estemos en el controlador
    let alias = 'UserFollower';

    //columnas y sus propiedades
    let cols = {
        id:{
            primaryKey: true,
            notNull: true,
            autoIncrement: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        FkUserId:{
            notNull: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        FkFollowerId:{
            notNull: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
    }
 
    let config = { 
        tableName: 'usersFollowers',
        timestamps: false, //le dice al modelo si la tabla estan las columnas updatedAt y createdAt
        underscored: false, //si la tabla tiene columnas con nombres usando _.
    }
    const UserFollower = Sequelize.define(alias, cols, config);


    UserFollower.associate = function(models){
        UserFollower.belongsToMany(models.UserFollower, {
        as: "Followers",
        through: "user_follower",
        foreignKey: "user_id",
        otherKey: "follower_id",
        timestamps: false
        });
    }
        
    return UserFollower;
}

