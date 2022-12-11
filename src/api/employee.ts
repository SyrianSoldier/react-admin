import request from '@/utils/request'
import { EmployeeSimpleRes } from '@/types'

export const getEmployeeSimple = () =>
  request.get<EmployeeSimpleRes>('/sys/user/simple')

export default {}
