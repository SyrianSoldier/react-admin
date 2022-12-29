import React, { ChangeEvent, DragEvent, FC, memo, useRef } from 'react'
import { CloudUploadOutlined } from '@ant-design/icons'
import * as XLSX from 'xlsx'
import { WorkSheet } from 'xlsx'
import { Button, message } from 'antd'
import UploadExcelWrapper from '@/components/upload-excel/style'

export interface ExcelObject {
  headers: string[]
  results: Record<string, string>[]
}

interface UploadExcelProps {
  beforeUpload?: (file: File) => void
  onSuccess?: (excelObject: ExcelObject) => void
}

const UploadExcel: FC<UploadExcelProps> = memo(
  ({ onSuccess, beforeUpload }) => {
    const uploadBtn = useRef<HTMLInputElement>(null)

    const resolveSheetHeaders = (sheet: WorkSheet): string[] => {
      const headers = [] as string[]
      // 1. 获取行和列的范围
      const range = XLSX.utils.decode_range(sheet['!ref']!)
      const headerRow = range.s.r
      let firstColumn
      for (firstColumn = range.s.c; firstColumn <= range.e.c; firstColumn++) {
        // 将行列信息通过XLSX.utils.encode_cell({ r: headerRow, c: firstColumn })转成字符串信息: 比如 c:1,r:1 ==> A1
        // 再从表中取出cell单元格对象
        const cell =
          sheet[XLSX.utils.encode_cell({ r: headerRow, c: firstColumn })]

        // 如果单元格和单元格的类型存在, 则存入单元格格式化后的值
        if (cell && cell.t) {
          headers.push(XLSX.utils.format_cell(cell))
        }
      }
      return headers
    }

    const fileToExcel = (file: File): Promise<ExcelObject> => {
      // 1. 将文件读成arrayBuffer
      // 2. 将arrayBuffer交给xlsx处理
      return new Promise((resolve, reject) => {
        const fr = new FileReader()
        fr.readAsArrayBuffer(file)
        fr.onload = e => {
          const fileBuffer = e.target?.result
          // 将fileBuffer转成工作簿对象
          const workbook = XLSX.read(fileBuffer, { type: 'buffer' })
          // 只取excel文件中的第一张表的数据
          const firstSheetName = workbook.SheetNames[0]
          const firstSheet = workbook.Sheets[firstSheetName]
          // 根据表生成
          const headers = resolveSheetHeaders(firstSheet)
          const results = XLSX.utils.sheet_to_json(firstSheet) as Record<
            string,
            string
          >[]
          resolve({
            headers,
            results
          })
        }
      })
    }

    const upload = async (file: File) => {
      if (beforeUpload) beforeUpload(file)
      const excelObject = await fileToExcel(file)
      if (onSuccess) onSuccess(excelObject)
    }

    const handleClickUpload = (e: ChangeEvent<HTMLInputElement>) => {
      // 1. 获取原生文件
      const { files } = e.target
      // 2. 合法性校验
      if (files!.length > 1) return
      // 3. 上传
      upload(files![0])
      // 4. 解决不能上传同一excel bug
      uploadBtn.current!.value = ''
    }

    const validateExcel = (file: File) => /(\.xls|\.xlsx)$/.test(file.name)

    const handleDragUpload = (e: DragEvent<HTMLDivElement>) => {
      // 0. 设置拖拽状态
      // 1. 阻止浏览器自动打开文件的默认行为
      e.preventDefault()
      // 2. 获取文件
      const { files } = e.dataTransfer
      // 3. 校验, 这里需要严格一点, 因为没有input的accept属性限制
      if (files.length !== 1) {
        message.error('只能上传一个excel文件')
        return
      }
      if (!validateExcel(files[0])) {
        message.error('只能上传.xls和.xlsx后缀的文件')
        return
      }
      // 4. 上传
      upload(files[0])
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault() // 拖拽事件放置的元素必须阻止默认行为
      e.stopPropagation()
      e.dataTransfer.dropEffect = 'copy' // 指定拖拽目的
    }
    return (
      <UploadExcelWrapper>
        <div className="click-upload">
          <Button type={'primary'} onClick={() => uploadBtn.current?.click()}>
            点击上传
          </Button>
          <input
            type="file"
            accept={'.xlsx,.xls'}
            hidden
            ref={uploadBtn}
            onChange={handleClickUpload}
          />
        </div>

        <div
          className="drag-upload"
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDrop={handleDragUpload}
        >
          <CloudUploadOutlined className={'upload-icon'} />
          <span>将Excel表拖到此处</span>
        </div>
      </UploadExcelWrapper>
    )
  }
)

UploadExcel.displayName = 'UploadExcel'
export default UploadExcel
