const express = require("express");

// create an express router
const router = express.Router();

// export router
module.exports = router;

// importing out of the db index object & accessing the Genre key using destructuring
/* same as:
const obj = require("..db")
const Genre = obj.Genre:
*/
const {Genre} = require("../db")

// GET /genre
// respond with HTML text to be rendered by the browser that will show a form
router.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
        <head>
        <title>Add a new genre</title>
        <link rel="stylesheet" type="text/css" href="/base-styling.css" />
        </head>
        <body>
            <h1>Add new genre </h1>
            <form method="POST" action="/genre">
                <div>
                    <label>Name:</label>
                    <input type="text" name="theName" />
                    <button type="submit">Add Genre</button>
                </div>
            </form>
        </body>
    </html>
    `)
})

// POST /genre
router.post("/", async (req, res, next) => {
    try {
        const newGenre = await Genre.create({name: req.body.theName})
        console.log(newGenre)
        // after you submit, you're going2b redirected back to the form to submit more:
        res.redirect("/genre")
    } catch (e){
        next(e)
    }
    
})