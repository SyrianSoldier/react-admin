import React, { memo, FC } from 'react'
import { Button, Form, Input } from 'antd'

interface LoginAccountSettingProps {}

const LoginAccountSetting: FC<LoginAccountSettingProps> = memo(() => {
  return (
    <Form wrapperCol={{ span: 6 }}>
      <Form.Item
        label={'姓名'}
        name={'username'}
        rules={[
          { required: true, message: '姓名为必填项' },
          { max: 4, min: 2, message: '姓名为2-4位中文' }
        ]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label={'密码'}
        name={'password'}
        rules={[
          { required: true, message: '密码' },
          { max: 12, min: 6, message: '密码为6-12位字符' }
        ]}
      >
        <Input type={'password'}></Input>
      </Form.Item>

      <Button type={'primary'} style={{ marginLeft: 50 }}>
        更新
      </Button>
    </Form>
  )
})

LoginAccountSetting.displayName = 'LoginAccountSetting'
export default LoginAccountSetting
