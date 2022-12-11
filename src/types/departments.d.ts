import { AddBase } from '@/types/base'

export type DeptsType = {
  id: string
  pid?: string
  name: string
  code: string
  introduce: string
  createTime: string
  manager?: string
}

export type DepartmentsData = AddBase<{
  companyId: string
  companyName: string
  companyManage: string
  depts: Array<DeptsType>
}>

export type DepartmentFormData = {
  name: string
  code: string
  manager: string
  pid: string
  introduce: string
}

export type PutDepartmentData = {
  id: string
  pid?: string
  name?: string
  code?: string
  introduce?: string
  createTime?: string
  manager?: string
}
