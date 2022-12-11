import React, { memo, FC } from 'react'
import { Layout, Spin } from 'antd'
import { Outlet } from 'react-router-dom'

const { Content: ContentAntd } = Layout

const Content: FC = memo(() => (
  <ContentAntd className={'layout-content'}>
    <React.Suspense
      fallback={<Spin delay={400} tip="Loading..." size="large"></Spin>}
    >
      <Outlet />
    </React.Suspense>
  </ContentAntd>
))

export default Content
