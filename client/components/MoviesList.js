import React, {useEffect, useState} from "react";
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

export function MovieList (props) {

  const [movies, setMovies] = useState([])
   
  useEffect(() => {
    const getMovies = async () => {
      const response = await axios.get('/movies');
      const newMovies = response.data;
      setMovies(newMovies);
    };
    getMovies();

  }, [props.id])
  
    if (movies === null){
      return <h1>"loading...</h1>
     
    } else {
      return (
      <div id='movie-list'>
      <ul id='list-of-movies'>
        {movies.map((aMovie) => {
          return <Movie key={aMovie.id} theMovie={aMovie} />;
        })}
      </ul>
    </div>
      )}

  }

export default MovieList;

