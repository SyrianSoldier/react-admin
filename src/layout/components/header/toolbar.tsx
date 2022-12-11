import React, { memo, FC } from 'react'
import { shallowEqual } from 'react-redux'
import { Avatar, Dropdown, MenuProps, Space } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/hooks'
import {
  removeTokenAction,
  setUserInfoAction
} from '@/store/modules/user/action-creator'

const Toolbar: FC = memo(() => {
  const userInfo = useAppSelector(state => state.user.userInfo, shallowEqual)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(setUserInfoAction({})) // 清除用户信息
    dispatch(removeTokenAction()) // 清除token
    navigate('/login') // 回到登录页
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to="/">首页</Link>
    },
    {
      key: '2',
      label: <Link to="/">项目地址</Link>
    },
    {
      key: '3',
      label: (
        <Link to="/" onClick={logout}>
          登出
        </Link>
      )
    }
  ]
  return (
    <div className="toolbar">
      <Dropdown menu={{ items }}>
        <Space className="selector">
          <Avatar src={userInfo.staffPhoto} />
          <span className="username">{userInfo.username}</span>
          <CaretDownOutlined />
        </Space>
      </Dropdown>
    </div>
  )
})

export default Toolbar
