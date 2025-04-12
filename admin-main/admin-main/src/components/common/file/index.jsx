import React, {Component, Fragment} from 'react'
import {SERVER_URL} from '_config'
import InlineSVG from "react-inlinesvg/esm";
import { get, isString } from 'lodash';
import applyFilters from '_helpers/functions/filters'
import {FaFilePowerpoint} from '@react-icons/all-files/fa/FaFilePowerpoint'
import {AiFillFile} from '@react-icons/all-files/ai/AiFillFile'
import BasicComponent from '_helpers/components/wrap/funs/basic';
const Types = {
  png: (props)=><img src={props.src} alt="data file"/>,
  jpg: (props)=><img src={props.src} alt="data file"/>,
  jpeg: (props)=><img src={props.src} alt="data file"/>,
  svg: (props)=><InlineSVG src={props.url} title={props.name}></InlineSVG>,
  ppt: (props)=><FaFilePowerpoint />,
  default: (props)=><AiFillFile />,

}
export default class Image extends Component {
  state = {}
  constructor(props){
    super(props);
    this.compares = {
      forms: {
        compare: ['val'],
        action: this.updateFile.bind(this),
        first_compare: true,
      },
    }
  }
  updateFile = (props)=>{
    if(isString(props.val)){
      applyFilters({key: 'request/checkFile'}, props.val).then(type=>{
        this.setState({type})
      })
    }else{
      applyFilters({
        key: 'common/multiApply',
        apps: {
          type: {
            key: 'request/getExtension',
            path: 'props.file.name'
          },
          sSrc: {
            key: 'request/toBase64',
            path: 'props.file'
          },
        }
      }, undefined, {props}).then(data=>{
        // debugger
        this.setState(data)
      })
    }
  }
  render() {
    const {type, sSrc} = this.state
    const {val, ...props} = this.props
    let mainSrc = ''
    let MainComp = '';
    if(isString(val)){
      mainSrc = `${SERVER_URL}/api/v1/files/${val}`
    }else{
      mainSrc = sSrc
    }
    if(type){
      MainComp = get(Types, type, Types.default)
    }
    return (
      <BasicComponent compare={this.compares} val={this.props.val}>
        {MainComp ? <MainComp src={mainSrc}/>:<Fragment></Fragment>}
      </BasicComponent>
    )
  }
}
