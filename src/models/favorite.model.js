const { Model, DataTypes } = require("sequelize")

class Favorite extends Model {}

function init(db){
    return Favorite.init({
        post: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, {
        timestamps: true,
        updatedAt: false,
        createdAt: "created",
        sequelize: db
    })
}

module.exports = { Favorite, init }