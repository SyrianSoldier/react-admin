import { shallowEqual } from 'react-redux'
import enUS from '@/locals/en-US'
import { LocalFields, LocalMap } from '@/locals/local'
import zhCn from '@/locals/zh-CN'
import { changeLocal } from '@/store/modules/local/action-creators'
import { useAppDispatch, useAppSelector } from './index'

const localMap: LocalMap = {
  'zh-CN': zhCn,
  'en-US': enUS
}

const useLocale = () => {
  const locale = useAppSelector(state => state.local.currentLocal, shallowEqual)
  const dispatch = useAppDispatch()
  const setLocal = (localName: LocalFields) =>
    dispatch(changeLocal(localMap[localName]))

  return [locale, setLocal] as const
}
export default useLocale
