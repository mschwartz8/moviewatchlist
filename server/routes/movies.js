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


router.get("/", async (req, res) => {
    try {

        const allMovies = await Movie.findAll({include: [Genre], order: [["title", "ASC"]]})
        res.send(
            `
            <!DOCTYPE html>
            <html>
                <head><title>Movie List</title></head>
                <link rel="stylesheet" type="text/css" href="/movie-list-style.css" />
                <body>
                <h1>Movie List </h1>
                <ul>
                ${allMovies.map(movie => {
                   return `
                    <li class="${movie.watched === true ? "watched" : ""}">
                        <h2>${movie.title}</h2>
                        ${movie.imbdLink ? `<a target="_blank" href="${movie.imbdLink}">IMBD profile </a>` : ""}
                        <ul>
                            ${movie.genres.map(genre => `<li>${genre.name}</li>`).join(" ")}
                        </ul>
                        ${movie.watched === false ? `<a href="/movies/${movie.id}/mark-watched"> I watched this. </a>` : ""}

                    </li>
                   `
                }).join(" ")}
                </ul>
                </body>
            `
        )

    } catch (e) {
        next(e)
    }
    
})

// GET /movies/add-movie
// respond with HTML text to be rendered by the browser that will show a form
router.get("/add-movie", async (req, res) => {
    // express method sendFile that allows you to send back a specific file 
    // __dirname is current directory name editing in (routes dir) + specific part
    // res.sendFile(__dirname + "/views/movie-form.html")
    const allOfMyGenres = await Genre.findAll();
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Add a movie to your watchlist</title>
        <link rel="stylesheet" type="text/css" href="/base-styling.css" />
    </head>
    <body>
        <h1>Add movie</h1>
        <form method="POST" action="/movies">
            <div>
                <label>Title:</label>
                <input type="text" name="title" />
            </div>
            <div>
                <label>IMDB link:</label>
                <input type="text" name="link" placeholder="Optional" />
            </div>
            <div>
                <div id="genre-selects-container">
                    <select id="genre-select" name="genres">
                        <option></option>
                        ${allOfMyGenres.map(genre => {
    return `<option value="${genre.id}">${genre.name}</option>`
}).join("")
    }
                    </select>
                </div>
                <button type="button" id="add-button">+</button>
            </div>
            <button type="submit">Add Movie</button>
        </form>
        <script type="text/javascript" src="/movie-form.js"></script>
    </body>
    </html>
`);
})

// POST /movies
router.post("/", async (req, res, next) => {
   const title = req.body.title;
   const imbdLink = req.body.link;
   const attachedGenreIds = req.body.genres;
   console.log(req.body, 'REQ BODY!!!!')
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