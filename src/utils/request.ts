import axios from 'axios'
import { message as Message } from 'antd'

import store from '@/store'
import {
  removeTokenAction,
  setUserInfoAction
} from '@/store/modules/user/action-creator'

const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    const newConfig = { ...config }
    const { token } = store.getState().user

    if (token && newConfig.headers) {
      newConfig.headers.Authorization = `Bearer ${token}`
    }

    return newConfig
  },
  error => {
    Message.destroy()
    Message.error(error.message, 2)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const { success, message } = response.data

    // 业务成功
    if (success) {
      return response
    }

    // 业务失败, 提示并且丢出异常
    Message.destroy()
    Message.error(message, 2)
    return Promise.reject(new Error(message))
  },
  error => {
    // 直接失败
    // token过期

    if (error?.response?.status === 401) {
      Message.destroy()
      Message.error('您的登录已失效, 请重新登录', 2)
      // 清空store数据后, 会自动刷新路由页面, 不用手动跳转到login
      store.dispatch(setUserInfoAction({}))
      store.dispatch(removeTokenAction())
    } else {
      Message.destroy()
      Message.error(error.message, 2)
    }

    return Promise.reject(error)
  }
)

export default service
