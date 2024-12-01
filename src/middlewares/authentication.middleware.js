const jsonwebtoken = require("jsonwebtoken")
const { User } = require("../models/user.model")
require("dotenv").config()

module.exports = async (req, res, next)=>{
    let token = req.cookies.auth;
    if(!token){
        return next()
    }
    try {
        let jwt = jsonwebtoken.verify(token, process.env.JWT_ACCESS_SECRET)
        if(!jwt.iss == "tweeter"){
            return next()
        }
        let dbUser = await User.findOne({
            where: {
                id: jwt.sub
            }
        })
        if(!dbUser){
            res.clearCookie("auth")
            return next()
        }
        req.user = dbUser
        next()
    } catch(e){
        next()
    }
}