const usersConfig = require("../../configs/users.config")
const usersService = require("../../services/users.service")
const passwordsHelper = require("../../helpers/passwords.helper")
const authenticationHelper = require("../../helpers/authentication.helper")

module.exports = async (req, res, next)=>{
    try {
        const username = req.body.username;
        const password = req.body.password;

        if(!username || typeof username != "string" || username.length > usersConfig.usernames.maxCharacters){
            return res.sendStatus(400)
        }

        if(!password || typeof password != "string" || password.length > usersConfig.passwords.maxCharacters){
            return res.sendStatus(400)
        }

        const exists = await usersService.userGetByUsername(username)
        if(!exists){
            return res.sendStatus(404)
        }

        const match = passwordsHelper.verifyPassword(password, exists.passhash)
        if(!match){
            return res.sendStatus(401)
        }

        authenticationHelper.authorize(res, exists.id)
        return res.sendStatus(203)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
}