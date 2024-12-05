const usersService = require("../../services/users.service")
const postsService = require("../../services/posts.service")

module.exports = async (req, res, next)=>{
    try {
        let userId = parseInt(req.params.id)
        if(isNaN(userId)){
            return res.sendStatus(400)
        }

        let user = await usersService.userGet(userId)
        if(!user){
            return res.sendStatus(404)
        }

        let posts = await postsService.favoritesUser(user)
        res.status(200).json(posts)  
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}
