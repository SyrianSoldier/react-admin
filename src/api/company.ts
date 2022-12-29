import request from '@/utils/request'
import { GetCompanyInfoRes } from '@/types'

export const getCompanyInfoApi = (companyId: number | string) =>
  request.get<GetCompanyInfoRes>(`/company/${companyId}`)

export default {}
