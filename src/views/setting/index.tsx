import React, { memo, FC, createContext, useState, useMemo } from 'react'
import { Tabs } from 'antd'
import CompanyInfo from '@/views/setting/components/company-info'
import RoleManage from '@/views/setting/components/role-manage'
import RoleSetModal from './components/role-set-modal'
import SettingWrapper from './style'
import { Role } from '@/types'

interface SettingContextProps {
  value: {
    isEdit: boolean
    isSetRoleModalOpen: boolean
    currentRole?: Role
    flushRoleManage?: () => void
  }
  setValue: (props: SettingContextProps['value']) => void
}

export const SettingContext = createContext<SettingContextProps | null>(null)

const Setting: FC = memo(() => {
  const [value, setValue] = useState<SettingContextProps['value']>({
    isEdit: false,
    isSetRoleModalOpen: false
  })

  const contextMemoValue = useMemo(
    () => ({
      value,
      setValue
    }),
    [value]
  )

  return (
    <SettingWrapper>
      <SettingContext.Provider value={contextMemoValue}>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: `角色管理`,
              key: '1',
              children: <RoleManage />
            },
            {
              label: `公司信息`,
              key: '2',
              children: <CompanyInfo />
            }
          ]}
        />

        <RoleSetModal />
      </SettingContext.Provider>
    </SettingWrapper>
  )
})

export default Setting
