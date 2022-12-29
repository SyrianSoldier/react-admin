import { AddBase } from '@/types/base'

export type GetRoleListParams = {
  page: string | number
  pagesize: string | number
  total?: number
}

export type Role = {
  id: string
  name: string
  description: string
}

export type GetRoleListRes = AddBase<{
  total: number
  rows: Array<Role>
}>

export type AddRoleData = {
  name: string
  description: string
}

export type UpdateRoleData = {
  companyId: string
  description: string
  id: string
  name: string
  permIds: string[]
}
