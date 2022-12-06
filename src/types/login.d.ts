import type { FormRule } from 'antd'

export type LoginFields = 'password' | 'mobile'

export type LoginRules = {
  // eslint-disable-next-line no-unused-vars
  [p in LoginFields]: FormRule[]
}

export type LoginForm = {
  // eslint-disable-next-line no-unused-vars
  [p in LoginFields]: string
}

export type LoginData = {
  success: boolean
  code: number
  data: string
  message: string
}

export default {}
