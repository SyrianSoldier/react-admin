import React, { memo, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import LoginWrapper from '@/views/login/style'
import { LoginRules, LoginForm } from '@/types'
import { useAppDispatch } from '@/hooks'
import { loginAction } from '@/store/modules/user/action-creator'

const Login: FC = memo(() => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const loginForm: LoginForm = {
    mobile: '13800000002',
    password: '123456'
  }

  const loginRules: LoginRules = {
    mobile: [
      { required: true, message: '请输入手机号!' },
      { pattern: /^1[0-9]{10}$/, message: '请输入11位正确的手机号!' }
    ],
    password: [
      {
        required: true,
        message: '请输入密码'
      },
      {
        max: 12,
        min: 6,
        message: '请输入6-12位有效的密码!'
      }
    ]
  }

  const onLogin = async (values: LoginForm) => {
    message.loading('登录中...', 0)

    await dispatch(loginAction(values) as any)

    navigate('/')

    message.destroy()
  }

  return (
    <LoginWrapper>
      <Form
        name="loginForm"
        className="login-form"
        onFinish={onLogin}
        initialValues={loginForm}
      >
        {/* 标题 */}
        <div className="titleContainer">
          <span className="title"></span>
        </div>

        {/* 账号 */}
        <Form.Item className="input" name="mobile" rules={loginRules.mobile}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Mobile"
          />
        </Form.Item>

        {/* 密码 */}
        <Form.Item
          className="input"
          name="password"
          rules={loginRules.password}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Login
          </Button>
        </Form.Item>

        <div className="tip" style={{ color: '#fff' }}>
          <span>账号: 13800000002</span> &nbsp;
          <span>密码: 123456</span>
        </div>
      </Form>
    </LoginWrapper>
  )
})

export default Login
