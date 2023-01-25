import { LocalExpand } from '@/locals/local'
import { CHANGE_LOCAL } from './constants'

export const changeLocal = (payload: LocalExpand) =>
  ({
    type: CHANGE_LOCAL,
    payload
  } as const)

export type LocalAction = ReturnType<typeof changeLocal>

export default {}
