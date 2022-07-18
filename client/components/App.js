import React from 'react'
              
import MoviesList from "./MoviesList"


class App extends React.Component {
    render () {
        return (
        <div>
                <h1>Movie List</h1>
            <nav>
            <a>Only Watched</a>
            <a>I'm Feeling Lucky</a>
            <a>Add to Watchlist</a>
            </nav>
                <h1>This is the App component</h1>
                <MoviesList />
        </div>
        ) 
}
}

export default App;