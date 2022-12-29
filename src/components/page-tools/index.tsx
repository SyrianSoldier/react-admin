import React, { memo, FC, ReactNode } from 'react'
import { Card, Col, Row, Alert } from 'antd'
import PageToolsWrapper from './style'

interface PageToolsProps {
  showLeft?: boolean
  title?: string
  right?: ReactNode
}

const PageTools: FC<PageToolsProps> = memo(
  ({ showLeft = false, title, right }) => (
    <PageToolsWrapper>
      <Card style={{ width: '100%' }} type={'inner'}>
        <Row>
          {/* 左侧 */}
          <Col span={12}>
            {showLeft && <Alert message={title} type="info" showIcon />}
          </Col>

          <Col span={12}>
            <Row justify={'end'}>
              {/* 右侧 */}
              <Col>{right}</Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </PageToolsWrapper>
  )
)

export default PageTools
