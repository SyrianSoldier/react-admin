import React, {
  memo,
  FC,
  createContext,
  useState,
  useMemo,
  useContext
} from 'react'
import { Tabs } from 'antd'
import CompanyInfo from '@/views/setting/components/company-info'
import RoleManage from '@/views/setting/components/role-manage'
import RoleSetModal from './components/role-set-modal'
import SettingWrapper from './style'
import { Role } from '@/types'
import AssignPermission from './components/assign-permission'

interface SettingContextProps {
  value: {
    isEdit: boolean
    isSetRoleModalOpen: boolean
    isAssignPermissionOpen: boolean
    currentRole?: Role
    flushRoleManage?: () => void
  }
  setValue: (props: SettingContextProps['value']) => void
}

export const SettingContext = createContext<SettingContextProps | null>(null)
export const useSettingState = () => useContext(SettingContext)

const Setting: FC = memo(() => {
  const [value, setValue] = useState<SettingContextProps['value']>({
    isEdit: false,
    isSetRoleModalOpen: false,
    isAssignPermissionOpen: false
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
        <AssignPermission />
      </SettingContext.Provider>
    </SettingWrapper>
  )
})

export default Setting
