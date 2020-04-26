import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { mergedReducers } from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './App'
import * as serviceWorker from './serviceWorker'

const appStore = createStore(mergedReducers, composeWithDevTools())

ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
