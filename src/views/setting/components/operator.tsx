import React, { memo, FC, useContext } from 'react'
import { Button, message, Modal, Space } from 'antd'
import { Role } from '@/types'
import { deleteRoleApi } from '@/api'
import { SettingContext } from '@/views/setting'

interface OperateProps {
  rowData: { text: string; index: number; record: Role }
  getRoleList: () => void
}

const Operate: FC<OperateProps> = memo(({ rowData, getRoleList }) => {
  const { value, setValue } = useContext(SettingContext)!

  const editRole = () => {
    setValue({
      ...value,
      isEdit: true,
      isSetRoleModalOpen: true,
      currentRole: rowData.record
    })
  }

  const deleteRole = () => {
    Modal.confirm({
      content: '是否确定删除角色?',
      onOk: async () => {
        await deleteRoleApi(rowData.record.id)
        await getRoleList()
        message.success('删除角色成功!', 3)
      }
    })
  }

  const assignPermision = () => {
    console.log(1)

    setValue({
      ...value,
      isAssignPermissionOpen: true,
      currentRole: rowData.record
    })
  }

  return (
    <Space>
      <Button
        type="primary"
        style={{ background: '#67c23a', color: '#fff' }}
        onClick={assignPermision}
      >
        分配权限
      </Button>

      <Button type="primary" onClick={editRole}>
        编辑
      </Button>

      <Button type="primary" danger onClick={deleteRole}>
        删除
      </Button>
    </Space>
  )
})

export default Operate
