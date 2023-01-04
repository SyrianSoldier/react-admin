import { Modal, Checkbox, message } from 'antd'
import React, { memo, useState, useEffect } from 'react'
import { useEmployeeState } from '..'
import { Role } from '@/types'
import { getRoleList, getBaseUserInfo, assignPermissionApi } from '@/api'

const AddRoleModal = memo(() => {
  const [employState, setEmployeeState] = useEmployeeState()!
  const [roles, setRoles] = useState<Role[]>()
  const [roleIds, setRoleIds] = useState<string[]>([])

  const getRoles = async () => {
    const { rows } = (
      await getRoleList({
        page: 1,
        pagesize: 100
      })
    ).data.data

    setRoles(rows)
  }

  const getRoleDetail = async () => {
    const id = employState.currentEmployee?.id

    if (id) {
      const { data } = (await getBaseUserInfo(id)).data
      setRoleIds(data.roleIds)
    }
  }

  useEffect(() => {
    if (employState.isAddRoleModalOpen) {
      getRoles()
      getRoleDetail()
    }
  }, [employState.isAddRoleModalOpen])

  const onCancel = () => {
    setEmployeeState({
      ...employState,
      isAddRoleModalOpen: false
    })

    setRoles([])
    setRoleIds([])
  }

  const isChecked = (id: string) => roleIds.includes(id)

  const onChnage = (id: string) => {
    // 如果没有就添加， 如果有就删除
    let idx = -1
    const ids = [...roleIds]
    const flag = roleIds.some((item, index) => {
      if (item === id) {
        idx = index
        return true
      }

      return false
    })

    if (flag && idx !== -1) {
      ids.splice(idx, 1)
    } else {
      ids.push(id)
    }

    setRoleIds(ids)
  }

  const onOk = async () => {
    await assignPermissionApi({
      id: employState.currentEmployee!.id,
      roleIds
    })

    onCancel()

    message.success('给用户分配角色成功', 3)
  }
  return (
    <Modal
      className="custom-modal"
      title="分配角色"
      open={employState.isAddRoleModalOpen}
      onCancel={onCancel}
      onOk={onOk}
    >
      {roles?.map(item => (
        <Checkbox
          key={item.id}
          checked={isChecked(item.id)}
          onChange={() => onChnage(item.id)}
        >
          {item.name}
        </Checkbox>
      ))}
    </Modal>
  )
})

export default AddRoleModal
