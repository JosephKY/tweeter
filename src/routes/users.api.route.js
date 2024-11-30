const usersApiRoute = require("express").Router()
const part = "/api/users/"
const loginrequired = require("../middlewares/loginrequired.middleware")
const nologinrequired = require("../middlewares/nologinrequired.middleware")

usersApiRoute.get(`${part}:id`, require("../controllers/api/user.get.controller"))
usersApiRoute.delete(`${part}delete`, loginrequired, require("../controllers/api/user.delete.controller"))
usersApiRoute.post(`${part}create`, nologinrequired, require("../controllers/api/user.create.controller"))

module.exports = usersApiRoute