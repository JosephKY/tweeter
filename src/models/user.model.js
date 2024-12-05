const { Model, DataTypes } = require("sequelize")

class User extends Model {}

function init(db){
    return User.init({
        screenname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        passhash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
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

module.exports = { User, init }