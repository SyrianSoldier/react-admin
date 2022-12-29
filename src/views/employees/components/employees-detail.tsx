import React, { memo, FC } from 'react'
import { useParams } from 'react-router-dom'
import { Tabs, TabsProps } from 'antd'

import LoginAccountSetting from '@/views/employees/components/login-acount-setting'
import IndividualInfo from '@/views/employees/components/individual-info'
import JobInfo from '@/views/employees/components/job-info'

const EmployeesDetail: FC = memo(() => {
  const { id } = useParams<'id'>()
  const tabsProps: TabsProps = {
    items: [
      {
        label: '登录账户设置',
        key: '1',
        children: <LoginAccountSetting />
      },
      {
        label: '个人信息',
        key: '2',
        children: <IndividualInfo />
      },
      {
        label: '岗位信息',
        key: '3',
        children: <JobInfo />
      }
    ],
    defaultActiveKey: '1'
  }
  return <Tabs {...tabsProps}>我是EmployeesDetail</Tabs>
})

EmployeesDetail.displayName = 'EmployeesDetail'
export default EmployeesDetail
