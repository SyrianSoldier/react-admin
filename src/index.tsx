import ReactDom from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from '@/store'

const root = ReactDom.createRoot(document.querySelector('#root') as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
