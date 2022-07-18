// the redux object

/*
    {
        movies: Array of Movie Objects (rows in db)
        selectableGenres: Array of Genre objects (rows in db) --> used in form for add movie
        randomMovie (I am feeling lukcy feat): A single Movie object
    }

    Canonical source of changing info in our application

    Dispatch an action to the store
        store.dispatch({ type: SET_ALLMOVIES, movie: moviesFromServer})
*/ 

// import { configureStore } from '@reduxjs/toolkit';
// import movieReducer from '../features/movies/moviesSlice'

// export const store = configureStore({
//     reducer: {
//         movies: movieReducer,
//     }
// })