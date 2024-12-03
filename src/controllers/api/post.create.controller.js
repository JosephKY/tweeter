const postsConfig = require("../../configs/posts.config")
const postsService = require("../../services/posts.service")
const xss = require("xss")

module.exports = async (req, res, next)=>{
    try {
        const content = req.body.content;
        if(!content || typeof content != 'string' || content.length == 0 || content.length > postsConfig.maxCharacters){
            return res.sendStatus(400)
        }

        const contentSanitized = xss(content)
        const post = await postsService.postCreate(req.user, contentSanitized)
        post.isFavorited = false;
        res.status(200).json(post) 
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
}