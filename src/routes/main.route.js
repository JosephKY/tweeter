const mainRoute = require("express").Router()

mainRoute.get("/", (req, res)=>{
    res.redirect("/home")
})
mainRoute.get("/home", require("../controllers/home.controller"))
mainRoute.get("/about", require("../controllers/about.controller"))
mainRoute.get("/login", require("../controllers/login.controller"))
mainRoute.get("/:screenname", require("../controllers/user.controller"))

module.exports = mainRoute