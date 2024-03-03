import { DownloadIcon } from '../Icons/Icons'
import * as XLSX from 'xlsx/xlsx.mjs'

function DownloadBtn({ data = [], fileName }) {
  return (
    <button
      onClick={() => {
        const datas = data?.length ? data : []
        const worksheet = XLSX.utils.json_to_sheet(datas)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
        XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : 'data.xlsx')
      }}
      className="download-btn flex flex-row items-center justify-end"
    >
      <DownloadIcon />
      Download
    </button>
  )
}

export default DownloadBtn
