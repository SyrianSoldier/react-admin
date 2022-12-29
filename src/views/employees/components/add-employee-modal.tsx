import React, { memo, FC, useEffect, useState } from 'react'
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  TreeSelect,
  message
} from 'antd'
import { useForm } from 'antd/es/form/Form'

import { useEmployeeState } from '@/views/employees'
import { addEmployeeApi, getDepartmentsApi } from '@/api'
import { toTreeDepts } from '@/utils'

interface AddEmployeeModalProps {}

const AddEmployeeModal: FC<AddEmployeeModalProps> = memo(() => {
  const [employeeState, setEmployeeState] = useEmployeeState()!
  const [depts, setDepts] = useState<any[]>([])
  const [form] = useForm()
  const [loading, setLoading] = useState(false)

  const onCancel = () => {
    form.resetFields()

    setEmployeeState({
      ...employeeState,
      isAddEmployeeModalOpen: false
    })
  }

  const addEmployee = async (values: any) => {
    setLoading(true)
    await addEmployeeApi({
      ...values,
      correctionTime: values.correctionTime.format('YYYY-MM-DD'),
      departmentName: values.departmentName.label,
      timeOfEntry: values.timeOfEntry.format('YYYY-MM-DD')
    })

    await employeeState.getEmployees()

    setLoading(false)
    message.success('添加员工成功', 3)
    onCancel()
  }

  const getDepartments = async () => {
    const { data } = (await getDepartmentsApi()).data
    setDepts(toTreeDepts(data.depts))
  }

  useEffect(() => {
    getDepartments()
  }, [])

  return (
    <Modal
      confirmLoading={loading}
      className={'custom-modal'}
      title={'新增员工'}
      open={employeeState.isAddEmployeeModalOpen}
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        form={form}
        onFinish={addEmployee}
      >
        <Form.Item
          label={'姓名'}
          name={'username'}
          rules={[
            { required: true, message: '姓名是必填项' },
            { min: 2, max: 4, message: '姓名的长度在2-4位' }
          ]}
        >
          <Input placeholder={'请输入姓名'} />
        </Form.Item>
        <Form.Item
          label={'手机号'}
          name={'mobile'}
          rules={[
            { required: true, message: '手机号是必填项' },
            { pattern: /^1[3-9]\d{9}$/, message: '手机号长度在11位' }
          ]}
        >
          <Input placeholder={'请输入手机号'} />
        </Form.Item>
        <Form.Item
          name={'timeOfEntry'}
          label={'入职时间'}
          rules={[{ required: true, message: '入职时间是必填项' }]}
        >
          <DatePicker placeholder={'请输入职时间'} />
        </Form.Item>
        <Form.Item
          name={'formOfEmployment'}
          label={'聘用形式'}
          rules={[{ required: true, message: '聘用形式是必填项' }]}
        >
          <Select
            style={{ width: '100%' }}
            placeholder={'请选择聘用形式'}
            options={[
              { label: '正式', value: 1 },
              { label: '非正式', value: 2 }
            ]}
          />
        </Form.Item>
        <Form.Item
          label={'工号'}
          name={'workNumber'}
          rules={[
            { required: true, message: '工号是必填项' },
            {
              pattern: /^\d{6}$/,
              message: '请输入6位数字工号'
            }
          ]}
        >
          <Input placeholder={'请输入6位工号'} />
        </Form.Item>
        <Form.Item
          name={'departmentName'}
          label={'部门'}
          rules={[{ required: true, message: '部门是必填项' }]}
        >
          {depts.length > 0 && (
            <TreeSelect
              fieldNames={{ label: 'name', value: 'id' }}
              showSearch
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择部门"
              allowClear
              treeDefaultExpandAll
              labelInValue
              treeData={depts}
            />
          )}
        </Form.Item>
        <Form.Item label={'转正时间'} name={'correctionTime'}>
          <DatePicker placeholder={'请选择转正时间'}></DatePicker>
        </Form.Item>
      </Form>
    </Modal>
  )
})

AddEmployeeModal.displayName = 'AddEmployeeModal'
export default AddEmployeeModal
