import React from 'react'
import ReactDom from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import '@/styles'
import App from './App'
import store from '@/store'

const root = ReactDom.createRoot(document.querySelector('#root') as HTMLElement)
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
