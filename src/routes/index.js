const { app } = require("../services/app.service")
const path = require("path")
const fs = require("fs")

const routeFileNames = fs.readdirSync(path.join(process.cwd(), "src", "routes"))
routeFileNames.forEach(routeFileName=>{
    if(routeFileName == "index.js" || !routeFileName.endsWith(".route.js")){
        return console.log("Skipping non-route: ", routeFileName)
    }

    app.use(require(path.join(process.cwd(), "src", "routes", routeFileName)))
    console.log("Routed: ", routeFileName)
})

app.get("*", (req, res)=>{
    res.send("404 Not Found")
})

console.log("Routes set-up complete")