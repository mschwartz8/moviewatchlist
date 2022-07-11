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
const {Genre, Movie} = require("../db")


router.get("/", (req, res) => {
    res.send('movie list haha')
})

// GET /movies/add-movie
// respond with HTML text to be rendered by the browser that will show a form
router.get("/add-movie", (req, res) => {
    res.send('pretend form')
})

// POST /movies
router.post("/", async (req, res, next) => {
   const title = req.body.title;
   const imbdLink = req.body.link;
   const attachedGenreIds = req.body.genres;
   
   try {

    const newMovie = await Movie.create({
        title: title, 
        imbdLink: imbdLink || null  // if there is a link, provide it, otherwise show null
    })

    await newMovie.setGenres(attachedGenreIds)
    res.redirect("/movies")
   } catch(e){
       next(e)
   }
    
})