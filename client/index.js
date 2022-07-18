import React from 'react'
import ReactDOM from "react-dom/client"
// it's a default export, so you can call it anything you want
import TheReactApp from "./features/movies/components/App"
// import {store} from "./store"
//import { Provider} from 'react-redux'
import App from './components/App'


const root = ReactDOM.createRoot(document.querySelector("#hey-react-put-your-app-here"));
root.render(<App />)

// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     document.querySelector("#hey-react-put-your-app-here")
// )