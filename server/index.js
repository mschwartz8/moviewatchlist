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


// matches any url for a get request to a pussible file in the public directory 
app.use(express.static(__dirname + "/public"))

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

const moviesRouter = require("./routes/movies");
app.use("/movies", moviesRouter)


app.get("/", (req, res) => {
    res.send(
        
        `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Movie WatchList App</title>
                <link rel="stylesheet" type="text/css" href="/base-styling.css" />
                <link rel="stylesheet" type="text/css" href="/movie-list-style.css" />
            </head>
            <body>
                <div id="hey-react-put-your-app-here"></div>
                <script src="/bundle.js"></script>
            </body>
        </html>
        `
    )
})