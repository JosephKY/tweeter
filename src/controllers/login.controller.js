module.exports = (req, res)=>{
    if(req.user){
        res.redirect("/home")
    } else {
        res.render("login", {user: null})
    }
}