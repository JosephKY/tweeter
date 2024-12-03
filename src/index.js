const { syncPromises } = require("./models")

Promise.all(syncPromises)
.then(()=>{
    console.log("Database set-up complete")
    require("./services/placeholders.service")
    require("./services/app.service")
    require("./routes")
})
.catch(e=>{
    console.log("Database set-up error")
    throw e
})