import ReactDom from 'react-dom/client'
import App from "./App";


const root = ReactDom.createRoot(document.querySelector('#root') as HTMLElement)
root.render(
  <App/>
)