import React, { FC } from 'react'
import { ConfigProvider } from 'antd'
import { HashRouter } from 'react-router-dom'
import usePermissionRoutes from '@/permission'
import useLocale from './hooks/useLocale'

const App: FC = () => {
  const [locale] = useLocale()

  return (
    <ConfigProvider locale={locale}>{usePermissionRoutes()}</ConfigProvider>
  )
}

export default App
