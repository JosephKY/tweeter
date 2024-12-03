const postsService = require("../../services/posts.service")
const { Tweet } = require("../../models/tweet.model")

module.exports = async(req, res, next)=>{
    try {
        let postId = req.body.post;
        if(!postId || typeof postId != 'number' || postId < 0){
            return res.sendStatus(400)
        }
        let post = await Tweet.findOne({
            where: {
                id: postId
            }
        })
        if(!post){
            return res.sendStatus(404)
        }
        let existingFav = await postsService.hasFavorited(req.user, post)
        if(!existingFav){
            return res.sendStatus(400)
        }
        await postsService.favoriteDelete(existingFav)
        res.sendStatus(203)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}