import React, { memo, FC } from 'react'
import { Button, message, Modal, Space } from 'antd'
import { utils as XLSXUtils, writeFile } from 'xlsx'
import { useNavigate } from 'react-router-dom'
import { useEmployeeState } from '@/views/employees'
import { getEmployeesApi } from '@/api'
import { HeadersMap } from '@/api/constant'

interface ExcelButtonsProps {
  total: number
}

const EnToZHHeadersMap = Object.fromEntries(
  Object.entries(HeadersMap).map(([zh, en]) => [en, zh])
)

const ExcelButtons: FC<ExcelButtonsProps> = memo(({ total }) => {
  const [employeeState, setEmployeeState] = useEmployeeState()!
  const navigate = useNavigate()
  const addEmployee = () => {
    setEmployeeState({
      ...employeeState,
      isAddEmployeeModalOpen: true
    })
  }

  const excelExport = () => {
    Modal.confirm({
      content: '是否确认导出员工数据为excel文件',
      onOk: async () => {
        // 1. 获取所有员工信息数据
        const { rows } = (await getEmployeesApi({ page: 1, size: total })).data
          .data
        // 2. 导出员工数据为excel表格
        const tableData = rows.map(obj => {
          const entries = Object.entries(obj).map(([enKey, value]) => [
            EnToZHHeadersMap[enKey],
            value
          ])
          return Object.fromEntries(entries)
        })

        const sheet = XLSXUtils.json_to_sheet(tableData, {
          header: Object.keys(HeadersMap)
        })

        writeFile(
          {
            SheetNames: ['sheet'],
            Sheets: { sheet }
          },
          '员工数据.xlsx'
        )
      }
    })
  }

  const excelExportComplex = () => {
    message.warning('该功能尚未实现,请联系管理员...', 3)
  }
  return (
    <>
      <Space>
        <Button type={'primary'} danger onClick={excelExport}>
          普通excel导出
        </Button>
        <Button
          type={'primary'}
          style={{ background: '#909399' }}
          onClick={excelExportComplex}
        >
          复杂表头excel导出
        </Button>
        <Button
          type={'primary'}
          style={{ background: '#67c23a' }}
          onClick={() => navigate('/import')}
        >
          excel导入
        </Button>
        <Button type={'primary'} onClick={addEmployee}>
          新增员工
        </Button>
      </Space>
    </>
  )
})

export default ExcelButtons
