import React, {
  memo,
  FC,
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo
} from 'react'
import { Switch, Table as AntdTable } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

import PageTools from '@/components/page-tools'
import ExcelButtons from '@/views/employees/components/excel-buttons'
import EmployeeOperates from '@/views/employees/components/employee-operates'
import Avatar from '@/components/avatar'
import { withPagination } from '@/hoc'
import { Employee } from '@/types'
import { getEmployeesApi } from '@/api'
import { HireType, WorkingState } from '@/api/constant'
import AddEmployeeModal from './components/add-employee-modal'

const Table = withPagination<Employee>(AntdTable)

interface EmployeeState {
  isAddEmployeeModalOpen: boolean
  getEmployees: () => Promise<void>
}

const EmployeeContext = createContext<
  [EmployeeState, Dispatch<SetStateAction<EmployeeState>>] | null
>(null)
export const useEmployeeState = () => useContext(EmployeeContext)

interface EmployeesProps {}

const Employees: FC<EmployeesProps> = memo(() => {
  const [tableParams, setTableParams] = useState({
    pageSize: 10,
    current: 1,
    total: 0,
    employees: [] as Employee[]
  })

  const [loading, setLoading] = useState(false)

  const getEmployees = async () => {
    setLoading(true)

    const { rows, total } = (
      await getEmployeesApi({
        page: tableParams.current,
        size: tableParams.pageSize
      })
    ).data.data

    setLoading(false)

    if (rows.length === 0 && total > 0) {
      // 如果本页没有数据, 且总数还有数据, 则回退一页, 重新发起请求
      // 解决删除某一页的最后一条数据显示空数据的bug
      setTableParams({
        ...tableParams,
        current: tableParams.current - 1
      })
    } else {
      setTableParams({ ...tableParams, total, employees: rows })
    }
  }

  const employeesState = useState({
    isAddEmployeeModalOpen: false,
    getEmployees
  })

  const memoEmployeeState = useMemo(() => employeesState, [employeesState[0]])

  useEffect(() => {
    getEmployees()
  }, [tableParams.current, tableParams.pageSize])

  const employeesCol: ColumnsType<Employee> = [
    {
      title: '序号',
      dataIndex: '$key',
      render: (a, b, index) => {
        const { pageSize, current } = tableParams
        return (current - 1) * pageSize + index + 1
      }
    },
    {
      title: '姓名',
      dataIndex: 'username',
      sorter: (a, b) => a.username.charCodeAt(0) - b.username.charCodeAt(0)
    },
    {
      title: '头像',
      dataIndex: 'staffPhoto',
      render: (a, record) => <Avatar src={record.staffPhoto}></Avatar>
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      sorter: (a, b) => +a.mobile - +b.mobile
    },
    {
      title: '工号',
      dataIndex: 'workNumber',
      sorter: true
    },
    {
      title: '聘用形式',
      dataIndex: 'formOfEmployment',
      render: (a, { formOfEmployment: index }) =>
        index ? HireType[+index] : '未知',
      sorter: true
    },
    {
      title: '部门',
      dataIndex: 'departmentName',
      sorter: true
    },
    {
      title: '聘用时间',
      dataIndex: 'timeOfEntry',
      render: (a, { timeOfEntry: time }) => dayjs(time).format('YYYY/MM/DD'),
      sorter: true
    },
    {
      title: '状态',
      dataIndex: 'enableState',
      sorter: true,
      render: (_, { enableState: index }) => (
        <Switch
          checkedChildren={WorkingState['1']}
          unCheckedChildren={WorkingState['2']}
          defaultChecked={+index === 1}
        />
      )
    },
    {
      title: '操作',
      dataIndex: '$operator',
      fixed: 'right',
      render: (_, employee) => (
        <EmployeeOperates employee={employee} getEmployees={getEmployees} />
      )
    }
  ]

  return (
    <EmployeeContext.Provider value={memoEmployeeState}>
      {/* 标题 */}
      <PageTools
        showLeft
        title={`共${tableParams.total}位员工`}
        right={<ExcelButtons total={tableParams.total} />}
      />

      {/* 表格 */}
      <Table
        rowKey={'id'}
        style={{ marginTop: '30px' }}
        bordered
        loading={loading}
        columns={employeesCol}
        dataSource={tableParams.employees}
        pagination={{
          ...tableParams,
          onChange: (current, pageSize) =>
            setTableParams({ ...tableParams, current, pageSize })
        }}
      />

      <AddEmployeeModal />
    </EmployeeContext.Provider>
  )
})

Employees.displayName = 'Employees'
export default Employees
