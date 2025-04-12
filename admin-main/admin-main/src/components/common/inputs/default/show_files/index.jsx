import React, {Component, useEffect, useState} from 'react'
import {map} from 'lodash'
import applyFilters from '_helpers/functions/filters'
import Image from 'components/common/image'
import styled from 'styled-components'
const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  img{
    max-height: 100px;
    max-width: 100px;
    margin: 0 10px;
  }
`
export default function ShowFiles(props) {
  let {field={}, form, show, val_fun} = props
  const [mainValue, updateValue] = useState(props.mainValue || field.value);
  useEffect(()=>{
    const getData = async()=>{
      if (val_fun) {
        const val = await applyFilters(val_fun, mainValue, {props: props})
        updateValue(val)
      }
    }
    getData()
  }, [field.value, form.values])
  const images = map(mainValue, (d)=>(<Image image={d.file} />))
  return (
    <Container>
      {images}
    </Container>
  )

}
