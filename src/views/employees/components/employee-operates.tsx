import React, { memo, FC } from 'react'
import { Button, message, Modal, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { deleteEmployeeApi } from '@/api'
import { Employee } from '@/types'
import { useEmployeeState } from '..'

interface EmployeeOperatesProps {
  employee: Employee
  getEmployees: () => void
}

const EmployeeOperates: FC<EmployeeOperatesProps> = memo(
  ({ employee, getEmployees }) => {
    const navigate = useNavigate()
    const [employeeState, setEmployeeState] = useEmployeeState()!

    const deleteEmployee = () => {
      Modal.confirm({
        content: '是否确认删除员工?',
        onOk: async () => {
          await deleteEmployeeApi(employee.id)
          await getEmployees()
          message.success('删除员工成功!', 3)
        }
      })
    }

    const assignEmployee = () => {
      // 1. 打开分配角色modal
      // 2. 存储当前员工信息
      setEmployeeState({
        ...employeeState,
        isAddRoleModalOpen: true,
        currentEmployee: employee
      })
    }
    return (
      <Space>
        <Button
          type={'link'}
          size={'small'}
          onClick={() => navigate(`/employees/detail/${employee.id}`)}
        >
          查看
        </Button>
        <Button type={'link'} size={'small'}>
          转正
        </Button>
        <Button type={'link'} size={'small'}>
          调岗
        </Button>
        <Button type={'link'} size={'small'}>
          离职
        </Button>
        <Button type={'link'} size={'small'} onClick={assignEmployee}>
          角色
        </Button>
        <Button type={'link'} size={'small'} onClick={deleteEmployee}>
          删除
        </Button>
      </Space>
    )
  }
)

EmployeeOperates.displayName = 'EmployeeOperates'
export default EmployeeOperates
