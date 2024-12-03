const { User } = require("../models/user.model")
const passwordsHelper = require("../helpers/passwords.helper")

function userGet(id){
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                where: {
                    id: id
                }
            })
            resolve(user)
        } catch (e) {
            reject(e)
        }
    });
}

function userGetByUsername(username){
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                where: {
                    username: username
                }
            })
            resolve(user)
        } catch (e) {
            reject(e)
        }
    });
}

function userCreate(screenname, username, password){
    return new Promise(async (resolve, reject) => {
        try {
            const passhash = await passwordsHelper.hashPassword(password)
            const user = await User.create({
                screenname: screenname,
                username: username,
                passhash: passhash
            })
            resolve(user)
        } catch (e) {
            reject(e)   
        }
    });
}

module.exports = { userGet, userGetByUsername, userCreate }