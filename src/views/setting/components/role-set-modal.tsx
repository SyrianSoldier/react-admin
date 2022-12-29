import React, { memo, FC, useContext, useEffect } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { SettingContext } from '@/views/setting'
import { addRoleApi, updateRoleApi } from '@/api'
import { useAppSelector } from '@/hooks'

const RoleSetModal: FC = memo(() => {
  const { value, setValue } = useContext(SettingContext)!
  const companyId = useAppSelector(state => state.user.userInfo.companyId)
  const title = value.isEdit ? '编辑角色' : '新增角色'
  const [form] = useForm()

  useEffect(() => {
    if (value.isSetRoleModalOpen) {
      form.setFieldsValue(value.currentRole)
    }
  }, [value.currentRole])

  const onCancel = () => {
    form.resetFields(['name', 'description'])

    setValue({ ...value, isSetRoleModalOpen: false })
  }

  const setRole = async (values: { name: string; description: string }) => {
    if (value.isEdit) {
      if (value.currentRole && companyId) {
        await updateRoleApi({
          companyId,
          permIds: [],
          id: value.currentRole.id,
          ...values
        })
      }
    } else {
      // 添加
      await addRoleApi(values)
    }

    if (value.flushRoleManage) {
      await value.flushRoleManage()
    }

    message.success(`${title}成功!`, 3)

    onCancel()
  }

  return (
    <Modal
      className={'custom-modal'}
      title={title}
      open={value.isSetRoleModalOpen}
      onOk={() => form.submit()}
      onCancel={onCancel}
    >
      <Form onFinish={setRole} form={form}>
        <Form.Item
          name={'name'}
          label={'角色名称'}
          rules={[{ required: true, message: '角色名称为必选' }]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item
          name={'description'}
          label={'角色描述'}
          rules={[{ required: true, message: '角色描述为必选' }]}
        >
          <Input></Input>
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default RoleSetModal
