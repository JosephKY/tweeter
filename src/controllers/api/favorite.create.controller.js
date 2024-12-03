const postsService = require("../../services/posts.service")
const { Tweet } = require("../../models/tweet.model")

module.exports = async(req, res, next)=>{
    try {
        let postId = parseInt(req.body.post);
        if(!postId || isNaN(postId) || postId < 0){
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
        if(postsService.hasFavorited(req.user, post)){
            return res.sendStatus(400)
        }
        await postsService.favoriteCreate(req.user, post)
        res.sendStatus(203)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}