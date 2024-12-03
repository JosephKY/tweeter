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

        delete user.dataValues.passhash
        res.status(200).json(user.dataValues)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}