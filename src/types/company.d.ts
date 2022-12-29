import { AddBase } from '@/types/base'

export type GetCompanyInfoRes = AddBase<{
  id: string
  name: string
  managerId: string
  version: string
  renewalDate: null
  expirationDate: null
  companyArea: null
  companyAddress: string
  businessLicenseId: null
  legalRepresentative: string
  companyPhone: string
  mailbox: string
  companySize: null
  industry: null
  remarks: string
  auditState: string
  state: number
  balance: number
  createTime: string
}>
