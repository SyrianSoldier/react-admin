import React, { memo, FC, useState, useEffect, useContext } from 'react'
import { Button, Table as AntdTable } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import Operator from '@/views/setting/components/operator'
import { withPagination } from '@/hoc'
import type { Role } from '@/types'
import { getRoleList } from '@/api/role'
import { SettingContext } from '@/views/setting'

const Table = withPagination<Role>(AntdTable)

const RoleManage: FC = memo(() => {
  const [tableParams, setTableParams] = useState({
    total: 0,
    roles: [] as Role[],
    current: 1,
    pageSize: 10
  })

  const [loading, setLoading] = useState(false)

  const { value, setValue } = useContext(SettingContext)!

  const getRoles = async () => {
    const params = {
      page: tableParams.current,
      pagesize: tableParams.pageSize
    }

    setLoading(true)

    const { total, rows: roles } = (await getRoleList(params)).data.data

    setLoading(false)
    setTableParams({ ...tableParams, total, roles })
  }

  const addRole = () => {
    setValue({
      ...value,
      isEdit: false,
      isSetRoleModalOpen: true
    })
  }

  useEffect(() => {
    setValue({
      ...value,
      flushRoleManage: getRoles
    })
  }, [])

  useEffect(() => {
    getRoles()
  }, [tableParams.current, tableParams.pageSize])

  const columns: ColumnsType<Role> = [
    {
      title: '序号',
      align: 'center',
      width: 150,
      render: (a, b, index) => {
        // 当前页数 - 1 *每页数量 + index +1
        const { current, pageSize } = tableParams
        return (current - 1) * pageSize + index + 1
      }
    },
    {
      title: '角色',
      width: 250,
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '描述',
      width: 450,
      dataIndex: 'description',
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'center',
      render: (text, record, index) => (
        <Operator rowData={{ text, record, index }} getRoleList={getRoles} />
      )
    }
  ]
  return (
    <>
      {/* 新增按钮 */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: '30px' }}
        onClick={addRole}
      >
        新增角色
      </Button>
      {/* 表格 */}
      <Table
        rowKey={'id'}
        dataSource={tableParams.roles}
        columns={columns}
        bordered
        loading={loading}
        pagination={{
          total: tableParams.total,
          onChange: (current, pageSize) =>
            setTableParams({ ...tableParams, current, pageSize })
        }}
      />
    </>
  )
})

RoleManage.displayName = 'RoleManage'

export default RoleManage
