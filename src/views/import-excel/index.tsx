import React, { memo, FC } from 'react'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import employeeXlsxTemplate from '@/assets/files/员工模板.xlsx'

import UploadExcel, { ExcelObject } from '@/components/upload-excel'
import { batchImportEmployeeApi } from '@/api'
import { formatDate } from '@/utils'
import { HeadersMap } from '@/api/constant'

interface ImportExcelProps {}

const generateSheetRow = (obj: Record<string, string>): object => {
  const entries = Object.entries(obj)
  type Key = keyof typeof HeadersMap

  const newObj = {} as Record<string, string>

  entries.forEach(([key, value]) => {
    if (key === '入职日期' || key === '转正日期') {
      value = new Date(formatDate(value)) as any
    }
    newObj[HeadersMap[key as Key]] = value
  })
  return newObj
}

const ImportExcel: FC<ImportExcelProps> = memo(() => {
  const navigate = useNavigate()
  const uploadEmployees = async (excelObject: ExcelObject) => {
    const { results } = excelObject

    message.loading('加载excel表格中..', 0)
    await batchImportEmployeeApi(results.map(generateSheetRow))
    message.destroy()

    navigate('/employees')
  }

  return (
    <>
      <UploadExcel onSuccess={uploadEmployees} />
      <a href={employeeXlsxTemplate} download="员工模板.xlsx">
        点击下载excel模板
      </a>
    </>
  )
})

ImportExcel.displayName = 'ImportExcel'
export default ImportExcel
