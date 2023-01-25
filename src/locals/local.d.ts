import type { Locale } from 'antd/es/locale-provider/index'

export interface LocalExpand extends Locale {
  custom: {
    login: string
    version: string
    companyName: string
    approvals: string
    attendances: string
    departments: string
    employees: string
    permissions: string
    salarys: string
    settings: string
    social_securitys: string
    dashboard: string
  }
}

export type LocalFields = 'zh-CN' | 'en-US'

export type LocalMap = {
  [key in LocalFields]: LocalExpand
}

export default {}
