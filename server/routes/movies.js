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


router.get("/", async (req, res, next) => {

    // to filter by unwatched, if unwatched === true, then set watched to false
    // in the query, set where to the value whereClause
    // when you put in http://localhost:8080/movies?unwatched=1 it will only show movies that are unwatched 
    const onlyUnwatched = req.query.unwatched === "1";
    const genreName = req.query.genre;

    const whereClause = {};

    if (onlyUnwatched === true) {
        whereClause.watched = false;
    }

    try {
        // if they are using the query to filter by genre, we'll follow the following code to find specificGenre type
        let movies;
        if (genreName) {
 
        // finds Genre by name in genre table
        const specificGenre = await Genre.findOne({
                where: {
                    name: genreName
                }
            });
            // if genre doesn't exist, then send bakc unknown genre
            if (!specificGenre) {
                res.status(404).send("Unknown genre");
                return;
            }
            // Then query the movies using a magic method that will find movies by genre, sorted by title & asc
            // includes whereClause in case you want the information about watched/unwatched
            // http://localhost:8080/movies?genre=drama&unwatched=1   shows you the movies with drama genre that are unwatched
            movies = await specificGenre.getMovies({
                include: [Genre],
                order: [
                    ["title", "ASC"]
                ],
                where: whereClause
            });

        } else {
                 // if you are not looking for a specific genre, then just finda all the movies & include their genres
            // sorted by title in asc order
            movies = await Movie.findAll({
                include: [Genre],
                order: [
                    ["title", "ASC"]
                ],
                where: whereClause
            });
        }
   
        res.send(
                        `
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>Movie List</title>
                        <link rel="stylesheet" type="text/css" href="/base-styling.css" />
                        <link rel="stylesheet" type="text/css" href="/movie-list-style.css" />
                    </head>
                    <body>
                        <h1>Movie List</h1>
                        <nav>
                            <a href="/movies?unwatched=1">Only Unwatched</a>
                            <a href="/movies/feeling-lucky">I'm Feeling Lucky</a>
                            <a href="/movies/add-movie">Add to Watchlist</a>
                        </nav>
                        <ul id="list-of-movies">
                            ${movies.map((movie) => {
                                return `
                                    <li class="${movie.watched === true ? "watched": ""}">
                                        <h2>${movie.title} ${movie.imdbLink ? `<a target="_blank" href="${movie.imdbLink}">IMDB</a>` : ""}</h2>

                                        <ul class="genres-list">
                                            ${movie.genres.map(genre => {
                                                return `<li><a href="/movies?genre=${genre.name}">${genre.name}</a></li>`;
                                            }).join("")}
                                        </ul>
                                        ${movie.watched === false ? `<a class="watch-link" href="/movies/${movie.id}/mark-watched">I watched this!</a>` : ""}
                                    </li>
                                `
                            }).join("")}
                        </ul>
                    </body>
                </html>
            `
        );
        

    } catch (e) {
        next(e)
    }
    
})

// GET /movies/add-movie
// respond with HTML text to be rendered by the browser that will show a form
router.get("/add-movie", async (req, res, next) => {
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

// GET responds with updating the movie in the db and updating it to watched & updates on the front end as crossed off
router.get("/:movieId/mark-watched", async (req, res, next) => {
    const id = req.params.movieId;
    console.log(id, 'THE MOVIE!!!!!!')
    try {
        const theMovie = await Movie.findByPk(id);
        
        if (!theMovie){
            res.status(404).send('no movie with that id');
            return;
        }

        // setting that specific movie in the db to true
        theMovie.watched = true;

        // saving that change
        await theMovie.save()

        res.redirect("/movies")

    } catch (e) {
        next(e)
    }


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