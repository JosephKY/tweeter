const usersApiRoute = require("express").Router()
const part = "/api/users/"
const loginrequired = require("../middlewares/loginrequired.middleware")
const nologinrequired = require("../middlewares/nologinrequired.middleware")

usersApiRoute.post(`${part}create`, nologinrequired, require("../controllers/api/user.create.controller"))
usersApiRoute.post(`${part}login`, nologinrequired, require("../controllers/api/user.login.controller"))
usersApiRoute.post(`${part}logout`, loginrequired, require("../controllers/api/user.logout.controller"))
usersApiRoute.post(`${part}:id/favorites`, require("../controllers/api/user.favorites.controller"))
usersApiRoute.get(`${part}:id`, require("../controllers/api/user.get.controller"))

module.exports = usersApiRoute