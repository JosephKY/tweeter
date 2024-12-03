require("dotenv").config()
const app = require("express")()
const path = require("path")
const { static } = require("express") 
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()

app.use(static('src/public'))
app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), "src", "views"))
app.use(require("cookie-parser")())
app.use(jsonParser)
app.use(bodyParser.urlencoded({ extended: true }));
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