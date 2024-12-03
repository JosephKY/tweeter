const postsService = require("../../services/posts.service")

module.exports = async (req, res, next)=>{
    try {
        const postId = req.body.post
        if(!postId || typeof postId != 'number' || postId < 0){
            return res.sendStatus(400)
        }

        const post = await postsService.postGet(postId);
        if(!post){
            return res.sendStatus(404)
        }

        if(post.author != req.user.id){
            return res.sendStatus(403)
        }

        await postsService.postDelete(post)
        res.sendStatus(203)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
}