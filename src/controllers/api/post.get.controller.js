const postsService = require("../../services/posts.service")

module.exports = async (req, res, next)=>{
    try {
        const postId = parseInt(req.params.id)
        if(!postId || isNaN(postId) || postId < 0){
            return res.sendStatus(400)
        }

        const post = await postsService.postGet(postId);
        if(!post){
            return res.sendStatus(404)
        }

        const postF = await postsService.isFavoritedConverter(post, req.user)
        
        res.status(200).json(postF)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
}