const jsonwebtoken = require("jsonwebtoken")
require("dotenv").config()

module.exports = (req, res, next)=>{
    let token = req.cookies.auth;
    if(!token){
        return next()
    }
    try {
        let jwt = jsonwebtoken.verify(token, process.env.JWT_ACCESS_SECRET)
        if(!jwt.iss == "tweeter"){
            return next()
        }
        req.user = jwt.sub
        next()
    } catch(e){
        next()
    }
}