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
        if(postsService.hasFavorited(req.user, post)){
            return res.sendStatus(400)
        }
        postsService.favoriteCreate(req.user, post)
        .then(()=>{
            res.sendStatus(203)
        })
        .catch(e=>{
            console.log(e)
            res.sendStatus(500)
        })
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}