import React from 'react'
import ReactDom from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd'
import '@/styles/index.css'
import App from './App'
import store from '@/store'

const root = ReactDom.createRoot(document.querySelector('#root') as HTMLElement)
root.render(
  <BrowserRouter>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </BrowserRouter>
)
