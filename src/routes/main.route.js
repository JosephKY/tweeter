const mainRoute = require("express").Router()

mainRoute.get("/", (req, res, next)=>{
    res.send("Hello World!")
})

mainRoute.get("*", (req, res)=>{
    res.send("404 Not Found")
})

module.exports = mainRoute