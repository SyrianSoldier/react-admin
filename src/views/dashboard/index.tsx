import React, { memo, FC, useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import { RadarChart, RadarSeriesOption } from 'echarts/charts'
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  DatasetComponent,
  DatasetComponentOption,
  TransformComponent
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  RadarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])
// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | RadarSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

interface DashboardProps {}

const DashBoard: FC<DashboardProps> = memo(() => {
  const echartsRef = useRef<HTMLDivElement>(null)

  const initEcharts = () => {
    if (echartsRef.current) {
      const myChart = echarts.init(echartsRef.current)

      myChart.setOption({
        title: {
          text: '个人工作绩效表'
        },
        radar: {
          indicator: [
            { name: '考勤', max: 6500 },
            { name: '工资', max: 16000 },
            { name: '代码质量', max: 30000 },
            { name: '工作积极性', max: 38000 },
            { name: '加班时长', max: 52000 },
            { name: 'bug数量', max: 25000 }
          ]
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: 'Allocated Budget'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: 'Actual Spending'
              }
            ]
          }
        ]
      } as ECOption)
    }
  }

  useEffect(() => {
    initEcharts()
  }, [])

  return (
    <div>
      <div ref={echartsRef} style={{ width: 400, height: 400 }}></div>
    </div>
  )
})

export default DashBoard
