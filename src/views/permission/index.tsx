import { Button, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { memo, FC, useState, useEffect } from 'react'
import PageTools from '@/components/page-tools'
import { getAllPermissions as getAllPermissionsApi } from '@/api'
import { Permission as PermissionType } from '@/types'

interface PermissionProps {}

export const transilateToTree = (data: any[], pid = '0') => {
  const res: any[] = []

  data.forEach(item => {
    if (item.pid === pid) {
      res.push(item)
      const children = transilateToTree(data, item.id)
      if (children.length > 0) {
        item.children = children
      }
    }
  })

  return res
}

const Permission: FC<PermissionProps> = memo(() => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<PermissionType[]>([])

  const columns: ColumnsType<PermissionType> = [
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '标识',
      dataIndex: 'code'
    },
    {
      title: '描述',
      dataIndex: 'description'
    },
    {
      title: '操作',
      align: 'center',
      render: (_, row: PermissionType) => (
        <>
          {row.type === 1 && <Button type="link">添加</Button>}
          <Button type="link">编辑</Button>
          <Button type="link">删除</Button>
        </>
      )
    }
  ]

  const getAllPermissions = async () => {
    setLoading(true)
    const res = await getAllPermissionsApi()
    setData(transilateToTree(res.data.data))
    setLoading(false)
  }

  useEffect(() => {
    getAllPermissions()
  }, [])

  return (
    <>
      <PageTools right={<Button type="primary">添加权限</Button>}></PageTools>

      <Table
        loading={loading}
        rowKey={'id'}
        columns={columns}
        dataSource={data}
      />
    </>
  )
})

export default Permission
