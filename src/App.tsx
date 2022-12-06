import React, { FC } from 'react'
import { Spin } from 'antd'
import PermissionRoues from '@/permission'

const App: FC = () => (
  <React.Suspense fallback={<Spin tip="Loading..." size="large"></Spin>}>
    <PermissionRoues />
  </React.Suspense>
)

export default App
