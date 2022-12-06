import axios from 'axios'
import { message as Message } from 'antd'

const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000
})

service.interceptors.request.use(
  config => config,
  error => {
    Message.error(error.message, 1000)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const { success, message } = response.data

    if (success) {
      return response
    }

    Message.error(message, 1000)
    return Promise.reject(new Error(message))
  },
  error => {
    Message.error(error.message, 1000)
    return Promise.reject(error)
  }
)

export default service
