module.exports = (req, res)=>{
    res.render("user", {user: req.user || null})
}