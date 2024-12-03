const usersConfig = require("../../configs/users.config") 
const { userGetByUsername, userCreate } = require("../../services/users.service")
const xss = require("xss")

module.exports = async (req, res, next)=>{
    try {
        const username = xss(req.body.username);
        const screenname = xss(req.body.screenname);
        const password = req.body.password;
    
        if(
            !username || 
            typeof username != 'string' || 
            username.length < usersConfig.usernames.minCharacters || 
            username.length > usersConfig.usernames.maxCharacters ||
            usersConfig.usernames.reserved.includes(username)
        ){
            return res.sendStatus(450)
        }
    
        const existingUsernameUser = await userGetByUsername(username)
        if(existingUsernameUser){
            return res.sendStatus(451)
        }
    
        for(let char of username){
            if(!usersConfig.usernames.allowedCharacters.includes(char)){
                return res.sendStatus(452)
            }
        }
    
        if(
            !screenname ||
            typeof screenname != 'string' ||
            screenname.length < usersConfig.screennames.minCharacters ||
            screenname.length > usersConfig.screennames.maxCharacters
        ){
            return res.sendStatus(453)
        }   

        if(
            !password ||
            typeof password != 'stirng' || 
            password.length < usersConfig.passwords.minCharacters ||
            password.length > usersConfig.passwords.maxCharacters
        ){
            return res.sendStatus(454)
        }

        const newuser = await userCreate(screenname, username, password)
        delete newuser.dataValues.passhash
        res.status(200).json(newuser.dataValues)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
}