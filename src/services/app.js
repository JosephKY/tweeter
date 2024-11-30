require("dotenv").config()
const app = require("express")()
const { static } = require("express") 

app.use(static('public'))
app.set('view engine', 'ejs')
app.use(require("cookie-parser")())
process.env.HTTPS == "1" ? app.use(require("express-http-to-https").redirectToHTTPS) : undefined
const port = process.env.MODE == "PROD" ? ( process.env.HTTPS == "1" ? 443 : 80 ) : 4000
app.listen(
    port,
    ()=>{
        console.log("App listening on port", port)
    }
)

console.log("App setup complete")

module.exports = { app }