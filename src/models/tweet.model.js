const { Model, DataTypes } = require("sequelize");
const { Favorite } = require("./favorite.model");

class Tweet extends Model {}

function init(db) {
    Tweet.init({
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
        favoritesCount: {
            type: DataTypes.VIRTUAL,
            get() {
                return this._favoritesCount || 0; 
            },
            set(value) {
                this._favoritesCount = value; 
            }
        }
    }, {
        timestamps: true,
        updatedAt: false,
        createdAt: "created",
        sequelize: db,
        hooks: {
            afterFind: async (results) => {
                if (!results) return;
                const instances = Array.isArray(results) ? results : [results];
                for (const instance of instances) {
                    if (instance.id) {
                        const count = await Favorite.count({ where: { post: instance.id } });
                        instance.setDataValue("favoritesCount", count);
                    }
                }
            }
        }
    });

    return Tweet;
}

module.exports = { Tweet, init };
