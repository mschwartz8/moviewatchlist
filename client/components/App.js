import React from 'react'
              
import MoviesList from "./MoviesList"


class App extends React.Component {
    render () {
        return (
        <div>
            <h1>This is the App component</h1>
            <MoviesList />
        </div>
        ) 
}
}

export default App;