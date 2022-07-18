import React from "react";
import axios from "axios";



class Movie extends React.Component {

  render() {
    const { theMovie } = this.props;
    return (
      <li className={theMovie.watched ? "watched" : ""}>
        <h2>
          {" "}
          {theMovie.title}{" "}
          {theMovie.imbdLink && (
            <a className='imbd-link' target='_blank' href={theMovie.imbdLink}>
              IMDB
            </a>
          )}
        </h2>
        <ul className='genres-list'>
          {theMovie.genres.map((genre) => {
            return (
              <li key={genre.id}>
                <a>{genre.name}</a>
              </li>
            );
          })}
        </ul>
      </li>
    );
  }
}

// const dummyMovies = [
//     {
//       title: "Shawshank Redemption",
//       watched: false,
//       genres: [{ name: "Drama" }, { name: "Comedy" }],
//     },
//     {
//       title: "The Dark Knight",
//       watched: false,
//       genres: [{ name: "Science Fiction" }, { name: "Comedy" }],
//     },
//   ];

class MovieList extends React.Component {

    constructor() {
        super();
        this.state = {
            fetchedMovies: null
        }
    }

    async componentDidMount () {
        // this will be refactored later to use thunks
        const response = await axios.get("/movies");
        const ourMovies = response.data;
        this.setState({fetchedMovies: ourMovies})

    }

    render() {

    if (this.state.fetchedMovies === null) {
        return <h3>Loading...</h3>
    }

    return (
      <div id='movie-list'>
        <ul id='list-of-movies'>
          {this.state.fetchedMovies.map((aMovie) => {
            return <Movie key={aMovie.id} theMovie={aMovie} />;
          })}
        </ul>
      </div>
    );
  }
}

export default MovieList;

/*
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
                                        <h2>${movie.title} ${movie.imbdLink ? `<a class='imbd-link' target="_blank" href="${movie.imbdLink}">IMDB</a>` : ""}</h2>

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
        
*/
