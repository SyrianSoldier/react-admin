import { message, Modal, Tree } from 'antd'
import React, { memo, useState, useEffect } from 'react'

import type { DataNode } from 'antd/es/tree'
import { useSettingState } from '..'
import {
  getAllPermissions,
  getRoleDetailApi,
  assignRolePermissionApi
} from '@/api'
import { transilateToTree } from '@/views/permission'

const AssignPermission = memo(() => {
  const { value, setValue } = useSettingState()!
  const [treeData, setTreeData] = useState<DataNode[]>([])
  const [permIds, setPermIds] = useState<string[]>([])

  const onCancel = () => {
    setValue({
      ...value,
      isAssignPermissionOpen: false
    })

    setTreeData([])
  }

  const getPermissions = async () => {
    const res = await getAllPermissions() // 获取所有权限
    const res2 = await getRoleDetailApi(value.currentRole!.id) // 获取当前角色的权限

    setPermIds(res2.data.data.permIds)

    setTreeData(transilateToTree(res.data.data))
  }

  useEffect(() => {
    if (value.isAssignPermissionOpen) {
      getPermissions()
    }
  }, [value.isAssignPermissionOpen])

  const onCheck = (checkedKeys: any) => setPermIds(checkedKeys)

  const onOk = async () => {
    await assignRolePermissionApi({
      id: value.currentRole!.id,
      permIds
    })

    onCancel()

    message.success('更新角色权限成功', 3)
  }
  return (
    <Modal
      title="分配权限"
      className="custom-modal"
      open={value.isAssignPermissionOpen}
      onCancel={onCancel}
      onOk={onOk}
    >
      {treeData.length > 0 && (
        <Tree
          checkable
          defaultExpandAll
          treeData={treeData}
          checkedKeys={permIds}
          onCheck={onCheck}
          fieldNames={{ title: 'name', key: 'id', children: 'children' }}
        />
      )}
    </Modal>
  )
})

export default AssignPermission
