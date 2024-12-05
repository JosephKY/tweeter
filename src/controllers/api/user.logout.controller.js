module.exports = (req, res, next)=>{
    res.clearCookie("auth")
    res.sendStatus(203)
}