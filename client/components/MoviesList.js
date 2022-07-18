import React, {useEffect, useState} from "react";
import axios from "axios";




export function Movie (props) {

     return (
      <li className={props.theMovie.watched ? "watched" : ""}>
        <h2>
          {" "}
          {props.theMovie.title}{" "}
          {props.theMovie.imbdLink && (
            <a className='imbd-link' target='_blank' href={props.theMovie.imbdLink}>
              IMDB
            </a>
          )}
        </h2>
        <ul className='genres-list'>
          {props.theMovie.genres.map((genre) => {
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

