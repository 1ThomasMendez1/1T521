    module.exports = function (Sequelize,DataTypes){
        let alias="User"
        let cols={
            id:{
                autoIncrement: true,
                notNull: true,
                primaryKey:true,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            email:{
                notNull: true,
                type: DataTypes.STRING,
                
            },
            username:{
                notNull: true,
                type: DataTypes.STRING,
            },
            password:{
                notNull: true,
                type: DataTypes.STRING,
            },
            date:{ //esto es date of release, que dia salio el producto
                notNull: true,
                type: DataTypes.DATE,
            },
            dni:{
                notNull: true,
                type: DataTypes.INTEGER,
            },
            image:{
                notNull: true,
                type: DataTypes.STRING,
            },
            createdAt:{
                notNull: true,
                type: DataTypes.DATE,
            },
            updatedAt:{
                type: DataTypes.DATE,
            }
            
        }
        let config={
            tableName: 'users',
            timestamps: true, //le dice al modelo si la tabla estan las columnas updatedAt y createdAt
            underscored: false,

        }
        const User = Sequelize.define(alias, cols, config);

    //Relaciones entre tablas

    User.associate = function(models){
        User.hasMany(models.Producto, 
            {
                as: 'posteos',
                foreignKey: 'id'
            });

        User.hasMany(models.Comment,
            {
                as: 'comentarios',
                foreignKey: 'id'
            });
    }

    return User;
    }