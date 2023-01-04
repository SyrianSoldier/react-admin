import { GENERARATE_ROUTES, RESET_ROUTES } from './constants'

export const generateRoutes = (payload: string[]) =>
  ({
    type: GENERARATE_ROUTES,
    payload
  } as const)

export const resetRoutes = () =>
  ({
    type: RESET_ROUTES
  } as const)

export type PermissionActions =
  | ReturnType<typeof generateRoutes>
  | ReturnType<typeof resetRoutes>

export default {}
