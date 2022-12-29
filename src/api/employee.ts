import request from '@/utils/request'
import {
  AddEmployeesParams,
  BatchImportEmployeeData,
  EmployeeSimpleRes,
  GetEmployeesParams,
  GetEmployeesRes
} from '@/types'

export const getEmployeeSimple = () =>
  request.get<EmployeeSimpleRes>('/sys/user/simple')

export const getEmployeesApi = (params: GetEmployeesParams) =>
  request.get<GetEmployeesRes>('/sys/user', { params })

export const deleteEmployeeApi = (id: string | number) =>
  request.delete<unknown>(`/sys/user/${id}`)

export const addEmployeeApi = (data: AddEmployeesParams) =>
  request.post<unknown, unknown, AddEmployeesParams>('/sys/user', data)

export const batchImportEmployeeApi = (data: BatchImportEmployeeData) =>
  request.post<unknown, unknown, BatchImportEmployeeData>(
    '/sys/user/batch',
    data
  )
export default {}
