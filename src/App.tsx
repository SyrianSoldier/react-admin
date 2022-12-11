import React, { FC } from 'react'
import usePermissionRoutes from '@/permission'

const App: FC = () => <>{usePermissionRoutes()}</>

export default App
