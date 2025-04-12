import React from 'react'
import {Button} from 'antd'
import {upload_excel} from './upload'
export default function ImportExcel(props) {
  const startUpload = ()=>{
    const {params} = props
    upload_excel(params)
  }

  return (
    <Button onClick={startUpload}>
      Import Excel
    </Button>
  )
}
