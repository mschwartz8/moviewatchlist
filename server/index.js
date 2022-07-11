const express = require("express");
// creates express application
const app = express();


const PORT = 8080;

// import dbConection
// get me the dbConnection key off the object using destructuring {}
const {dbConnection} = require("./db")

const startServer = async () => {
    // checks for matching the associations with models in db & syncs with db
    await dbConnection.sync()
    // then after that's finished, start the server
    app.listen(PORT, () => {
        console.log(`server is runnong on port ${PORT}`)
    })
}

startServer()

// **MIDDLEWARE**

// to be able to get the body from the requests & req.body will be available
// in case we get json data:
app.use(express.json());
// in case we get urlencoded data:
app.use(express.urlencoded({extended:false}))

// require in inputs from specific routes
const genresRouter = require("./routes/genre"); 
// any request method to any url that starts with /genre, goes into genre router
app.use("/genre", genresRouter)


app.get("/", (req, res) => {
    res.send("Hello :)")
})