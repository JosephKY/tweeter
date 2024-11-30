require("dotenv").config()
const env = process.env
const sequelize = require("sequelize")
const path = require("path")
const fs = require("fs")
const db = new sequelize.Sequelize({
    username: env.DB_USER,
    password: env.DB_PASS,
    host: env.DB_HOST,
    database: env.DB_NAME,
    dialect: "mysql"
})

let syncPromises = [];
const dbFileNames = fs.readdirSync(path.join(process.cwd(), "src", "models"))
console.log("Database model registration initating")
dbFileNames.forEach(async dbFileName=>{
    if(dbFileName == "index.js" || !dbFileName.endsWith(".model.js")){
        return console.log("Skipping non-model file: ", dbFileName)
    }

    let { init } = require(path.join(process.cwd(), "src", "models", dbFileName))
    if(!init){
        return console.log("Invalid export for ", dbFileName)
    }
    syncPromises.push(
        init(db).sync({
            alter: true,
            force: false
        })
    )
})

module.exports = { syncPromises, db }