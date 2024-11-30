const { Model, DataTypes } = require("sequelize")

class Tweet extends Model {}

function init(db){
    return Tweet.init({
        author: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
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

module.exports = { Tweet, init }