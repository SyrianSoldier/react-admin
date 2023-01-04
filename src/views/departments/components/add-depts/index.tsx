import React, { memo, FC, useContext, useState, useRef, useEffect } from 'react'
import type { ValidatorRule } from 'rc-field-form/lib/interface'
import { Modal, Form, Input, Select, message } from 'antd'
import { DepartmentsContext } from '@/views/departments'
import {
  addDepartmentApi,
  editDepartmentApi,
  getDepartmentsApi,
  getEmployeeSimple
} from '@/api'
import type { DepartmentFormData, EmployeeSimpleRes } from '@/types'

interface AddDeptsProps {
  isModalOpen: boolean
  setIsShowModal: (flag: boolean) => void
  flushDepartments: () => void
}

const AddDepts: FC<AddDeptsProps> = memo(
  ({ isModalOpen, setIsShowModal, flushDepartments }) => {
    const { deptsContextProps } = useContext(DepartmentsContext)!
    const [form] = Form.useForm()
    const [employee, setEmployee] = useState<EmployeeSimpleRes['data']>([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
      if (deptsContextProps.isDeptEdit) {
        form.setFieldsValue({ ...deptsContextProps.currentTreeNode })
      }
    }, [deptsContextProps])

    const checkDeptCode: ValidatorRule['validator'] = async (rule, value) => {
      const { currentTreeNode: node, isDeptEdit } = deptsContextProps
      const { depts } = (await getDepartmentsApi()).data.data
      let isRepeat = false

      if (isDeptEdit) {
        isRepeat = depts
          .filter(item => item.id !== node?.id)
          .some(item => item.code === node?.code)
      } else {
        isRepeat = depts.some(item => item.code === value)
      }

      if (isRepeat) throw new Error('部门编码重复!')
    }

    const checkDeptName: ValidatorRule['validator'] = async (rule, value) => {
      const { currentTreeNode: node, isDeptEdit } = deptsContextProps

      const { depts } = (await getDepartmentsApi()).data.data
      let isRepeat = false

      if (isDeptEdit) {
        isRepeat = depts
          .filter(item => item.pid === node?.id && item.id !== node?.id) // 找出除了自己的所有子部门
          .some(item => item.name === value) // 判断子部门名字是否重复
      } else {
        isRepeat = depts
          .filter(item => item.pid === node?.id) // 找出所有子部门
          .some(item => item.name === value) // 判断子部门名字是否重复
      }

      if (isRepeat) throw new Error('部门名称不可重复!')
    }

    const getEmployees = async () => {
      setLoading(true)

      const employees = (await getEmployeeSimple()).data.data
      setEmployee(employees)

      setLoading(false)
    }

    const onCancel = () => {
      form.resetFields(['name', 'introduce', 'manager', 'code'])

      setIsShowModal(false)
    }

    const saveDepartment = async (values: Omit<DepartmentFormData, 'pid'>) => {
      message.loading('正在添加部门中..', 0)

      if (deptsContextProps.isDeptEdit) {
        await editDepartmentApi({
          ...deptsContextProps.currentTreeNode!,
          ...values
        })
      } else {
        await addDepartmentApi({
          ...values,
          pid: deptsContextProps.currentTreeNode?.id as string
        })
      }

      await flushDepartments()

      message.destroy()

      message.success(
        `${deptsContextProps.isDeptEdit ? '编辑' : '添加'}${
          values.name
        }部门成功!`,
        3
      )

      onCancel()
    }

    return (
      <Modal
        title={`${deptsContextProps.isDeptEdit ? '编辑' : '新增'}部门`}
        open={isModalOpen}
        className="custom-modal"
        cancelText="取消"
        okText="确定"
        onCancel={onCancel}
        onOk={() => form.submit()}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          validateTrigger={'onBlur'}
          onFinish={saveDepartment}
        >
          <Form.Item
            label="部门名称"
            name="name"
            rules={[
              { required: true, message: '请输入部门名称' },
              { max: 10, min: 1, message: '部门名称字符在1-10字符' },
              { validator: checkDeptName }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="部门编码"
            name="code"
            rules={[
              { required: true, message: '请输入部门编码' },
              { min: 1, max: 10, message: '部门编码在1-10字符' },
              { validator: checkDeptCode }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="部门负责人"
            name="manager"
            rules={[{ required: true, message: '请输入部门负责人!' }]}
          >
            <Select
              options={employee}
              fieldNames={{ label: 'username', value: 'username' }}
              showSearch
              onFocus={getEmployees}
              loading={isLoading}
            />
          </Form.Item>

          <Form.Item
            label="部门介绍"
            name="introduce"
            rules={[{ required: true, message: '请输入部门名称' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
)

export default AddDepts
