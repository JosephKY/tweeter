const mainRoute = require("express").Router()

mainRoute.get("/", require("../controllers/home.controller"))
mainRoute.get("/about", require("../controllers/about.controller"))
mainRoute.get("/:screenname", require("../controllers/user.controller"))

mainRoute.get("*", (req, res)=>{
    res.send("404 Not Found")
})

module.exports = mainRoute