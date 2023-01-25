import React from 'react'
import ReactDom from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import '@/styles/index.css'
import App from './App'
import store from '@/store'
import { getFirstScreenTime } from '@/performance'

getFirstScreenTime()

const root = ReactDom.createRoot(document.querySelector('#root') as HTMLElement)
root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
)
