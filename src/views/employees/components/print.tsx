import { Button } from 'antd'
import React, { memo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

const Print = memo(() => {
  const printRef = useRef(null)

  const handlePrint = useReactToPrint({
    content: () => printRef.current
  })

  return (
    <>
      你好， 这里是打印页
      <Button type="primary" onClick={handlePrint}>
        打印
      </Button>
      <table
        style={{ width: '500px', border: '1px solid gold' }}
        ref={printRef}
      >
        <caption>员工信息</caption>

        <tbody>
          <tr>
            <td>姓名 </td>
            <td>陈一天 </td>
          </tr>

          <tr>
            <td>性别 </td>
            <td>男 </td>
          </tr>

          <tr>
            <td>手机 </td>
            <td>13513926888 </td>
          </tr>

          <tr>
            <td>出生日期 </td>
            <td>1996-07-11 </td>
          </tr>

          <tr>
            <td>最高学历 </td>
            <td>博士1 </td>
          </tr>
        </tbody>
      </table>
    </>
  )
})

export default Print
