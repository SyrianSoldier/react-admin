import React, { memo, FC } from 'react'
import { Avatar as AntdAvatar } from 'antd'
import DefaultAvatar from '@/assets/images/head.jpg'

interface AvatarProps {
  src: string
}

const Avatar: FC<AvatarProps> = memo(({ src }) => {
  return <AntdAvatar src={src} icon={<img src={DefaultAvatar} />}></AntdAvatar>
})

Avatar.displayName = 'Avatar'
export default Avatar
