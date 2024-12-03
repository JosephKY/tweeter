module.exports = (req, res)=>{
    res.render("about", {user: req.user || null})
}