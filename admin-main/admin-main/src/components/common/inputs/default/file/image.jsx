import React, {Component, Fragment} from 'react'
import {SERVER_URL} from '_config'
import InlineSVG from "react-inlinesvg/esm";
import { get, isString } from 'lodash';
import applyFilters from '_helpers/functions/filters'
import {FaFilePowerpoint} from '@react-icons/all-files/fa/FaFilePowerpoint'
import {AiFillFile} from '@react-icons/all-files/ai/AiFillFile'
import BasicComponent from '_helpers/components/wrap/funs/basic';
const Types = {
  png: (props)=><img src={props.src} />,
  jpg: (props)=><img src={props.src} />,
  jpeg: (props)=><img src={props.src} />,
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
        compare: ['file'],
        action: this.updateFile.bind(this),
        first_compare: true,
      },
    }
  }
  updateFile = (props)=>{
    if(isString(props.file)){
      applyFilters({key: 'request/checkFile'}, props.file).then(type=>{
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
    const {file, ...props} = this.props
    let mainSrc = ''
    let MainComp = '';
    if(isString(file)){
      mainSrc = `${SERVER_URL}/api/v1/files/${file}`
    }else{
      mainSrc = sSrc
    }
    if(type){
      MainComp = get(Types, type, Types.default)
    }
    return (
      <BasicComponent compare={this.compares} file={this.props.file}>
        {MainComp ? <MainComp src={mainSrc}/>:<Fragment></Fragment>}
      </BasicComponent>
    )
  }
}
