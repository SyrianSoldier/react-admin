import { useState } from 'react'
import { useAppSelector } from './store'

const usePointPermission = (point: string) => {
  const points = useAppSelector(state => state.user.userInfo.roles!.points)
  const [isShow, setShow] = useState(points.includes(point))

  return [isShow, setShow]
}
export default usePointPermission
