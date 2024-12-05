const jsonwebtoken = require("jsonwebtoken")
require("dotenv").config()

function authorize(res, userId){
    const token = jsonwebtoken.sign({
        sub: userId,
        iss: 'tweeter'
    }, process.env.JWT_ACCESS_SECRET, {expiresIn: "24h"})
    res.cookie("auth", token, {httpOnly: true})
}

module.exports = { authorize }
