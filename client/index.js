import React from 'react'
import ReactDOM from 'react-dom'
// it's a default export, so you can call it anything you want
import TheReactApp from "./components/App"


ReactDOM.render(
    <h1><TheReactApp /></h1>,
    document.querySelector("#hey-react-put-your-app-here")
)