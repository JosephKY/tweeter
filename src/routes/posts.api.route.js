const postsApiRoute = require("express").Router()
const part = "/api/posts/"
const loginrequired = require("../middlewares/loginrequired.middleware")
const nologinrequired = require("../middlewares/nologinrequired.middleware")


postsApiRoute.delete(`${part}delete`, loginrequired, require("../controllers/api/post.delete.controller"))
postsApiRoute.post(`${part}create`, loginrequired, require("../controllers/api/post.create.controller"))
postsApiRoute.get(`${part}latest`, require("../controllers/api/post.latest.controller"))
postsApiRoute.post(`${part}favorite`, loginrequired, require("../controllers/api/favorite.create.controller"))
postsApiRoute.delete(`${part}favorite`, loginrequired, require("../controllers/api/favorite.delete.controller"))
postsApiRoute.get(`${part}user/:id`, require("../controllers/api/post.user.controller"))
postsApiRoute.get(`${part}:id`, require("../controllers/api/post.get.controller"))

module.exports = postsApiRoute