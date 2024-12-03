const { postsUser, isFavoritedConverter } = require("../../services/posts.service")
const { userGet } = require("../../services/users.service")

module.exports = async (req, res, next)=>{
    try {
        const userId = parseInt(req.params.id)
        if(!userId || isNaN(userId) || userId < 0){
            return res.sendStatus(400)
        }

        const user = await userGet(userId)
        if(!user){
            return res.sendStatus(404)
        }

        const latest = await isFavoritedConverter(await postsUser(user))
        res.status(200).json(latest)
    } catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
}