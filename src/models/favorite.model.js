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
        }
    }, {
        timestamps: true,
        updatedAt: false,
        createdAt: "created",
        sequelize: db
    })
}

module.exports = { Favorite, init }