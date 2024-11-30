const { app } = require("../services/app")
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

console.log("Routes set-up complete")