const express = require("express");
// creates express application
const app = express();


const PORT = 8080;

// import dbConection
const dbConnection = require("./db")

const startServer = async () => {
    // checks for matching the associations with models in db & syncs with db
    await dbConnection.sync()
    // then after that's finished, start the server
    app.listen(PORT, () => {
        console.log(`server is runnong on port ${PORT}`)
    })
}

startServer()



app.get("/", (req, res) => {
    res.send("Hello :)")
})