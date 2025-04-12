/* eslint-disable no-unused-vars */
import React, {Fragment, useEffect, useState} from 'react';
import {Image} from 'antd';
import applyFilters from '_helpers/functions/filters';
import { SERVER_URL } from '_config';
export default function ImageItem(props) {
  const {image, width=200, extra, ...mainProps} = props
  const [path, updatePath] = useState()
  useEffect(()=>{
    const getImage = async()=>{
      const pa = image?.key ? await applyFilters(image, undefined, {props: mainProps}):`${SERVER_URL}/api/v1/files/${image}`
      updatePath(pa)
    }
    getImage()
  }, [props])
  if(!path){
    return <Fragment></Fragment>
  }
  // const {source = path?.source || {uri: [BASE_URL, path || DEFAULT_IMAGE].join('/')}, styles: r_styles, ...props} = props
  return (
    <Image
    // width={width}
    {...extra}
    src={path}
  />
  );
}
