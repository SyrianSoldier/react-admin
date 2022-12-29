import { AddBase } from './base'

export type EmployeeSimpleRes = AddBase<
  Array<{
    username: string
    id: string
  }>
>
export type GetEmployeesParams = {
  page: string | number
  size: string | number
}

export type Employee = {
  id: string
  mobile: string
  username: string
  password: string
  enableState: number
  timeOfEntry: string
  formOfEmployment: number
  workNumber: string
  correctionTime: string
  departmentName: string
  staffPhoto: string
}

export type GetEmployeesRes = AddBase<{
  total: number
  rows: Array<Employee>
}>

export type AddEmployeesParams = {
  mobile: string
  username: string
  timeOfEntry: string
  formOfEmployment: number
  workNumber: string
  correctionTime: string
  departmentName: string
}

export type BatchImportEmployeeData = Partial<AddEmployeesParams>[]
