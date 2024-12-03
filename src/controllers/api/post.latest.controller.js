const { postsLatest, isFavoritedConverter } = require("../../services/posts.service")

module.exports = async (req, res, next)=>{
    try {
        const latest = await isFavoritedConverter(await postsLatest(), req.user)
        console.log(latest)
        res.status(200).json(latest)
    } catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
}