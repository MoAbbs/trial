import React from 'react'
import { Spin } from 'antd';
import {AiOutlineLoading} from '@react-icons/all-files/ai/AiOutlineLoading'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
export default function Loading(props) {
  return <div className="spining">
    <Spin indicator={<LoadingOutlined />} size="large"/>
  </div>
}
