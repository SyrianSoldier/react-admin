import React, { memo, FC } from 'react'
import { Layout, Spin } from 'antd'
import { Outlet } from 'react-router-dom'
import TagView from '@/components/tags-view'

const { Content: ContentAntd } = Layout

const Content: FC = memo(() => (
  <ContentAntd className={'layout-content'}>
    <React.Suspense
      fallback={<Spin delay={400} tip="Loading..." size="large"></Spin>}
    >
      <TagView />

      <Outlet />
    </React.Suspense>
  </ContentAntd>
))

export default Content
