import React, { memo, FC, useState, useEffect } from 'react'
import { Alert, Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { getCompanyInfoApi } from '@/api/company'
import { useAppSelector } from '@/hooks'

interface CompanyInfoProps {}

const CompanyInfo: FC<CompanyInfoProps> = memo(() => {
  const [isDisable] = useState(true)

  const compannyId = useAppSelector(state => state.user.userInfo.companyId)

  const [form] = useForm()

  const warnMessage =
    '对公司名称、公司地址、营业执照、公司地区的更新, 将使得公司资料被重新审核, 请谨慎修改'

  const getCompanyInfo = async () => {
    const { data } = (await getCompanyInfoApi(compannyId!)).data

    form.setFieldsValue(data)
  }

  useEffect(() => {
    getCompanyInfo()
  }, [])
  return (
    <div>
      {/* 警告 */}
      <Alert
        message={warnMessage}
        type="warning"
        showIcon
        style={{ marginBottom: '30px' }}
      />
      {/* 表单 */}
      <Form
        wrapperCol={{ span: 10 }}
        disabled={isDisable}
        form={form}
        labelAlign={'right'}
        labelCol={{ span: 2 }}
      >
        <Form.Item label="公司名称" name="name">
          <Input></Input>
        </Form.Item>
        <Form.Item label="公司地址" name="companyAddress">
          <Input></Input>
        </Form.Item>
        <Form.Item label="公司邮箱" name="mailbox">
          <Input></Input>
        </Form.Item>
        <Form.Item label="备注" name="remarks">
          <Input.TextArea autoSize={{ minRows: 3 }}></Input.TextArea>
        </Form.Item>
      </Form>
    </div>
  )
})

export default CompanyInfo
