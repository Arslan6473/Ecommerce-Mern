import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/Store.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </Provider>
)
