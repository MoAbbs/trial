/* eslint-disable no-invalid-this */
import React, {Component} from 'react'
import Image from './image'
// import {get} from 'lodash'
import {AiOutlineCloseCircle} from '@react-icons/all-files/ai/AiOutlineCloseCircle';
import {AiOutlineCamera} from '@react-icons/all-files/ai/AiOutlineCamera';
import style from './style.module.less'
import { Button } from 'antd'
import withInput from '_helpers/components/wrap/funs/input'
import { isEqual } from 'lodash';
import applyFilters from '_helpers/functions/filters';

export class FileUploader extends Component {
  state={}
  constructor(props){
    super(props);
    if(props.props?.accept_fun){
      this.updateAccept(props)
    }
  }
  onChangeFile(event) {
    const {onChange} = this.props;
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    onChange(file)
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.props?.accept_fun){
      const condition = !isEqual(JSON.stringify({props: this.props}), JSON.stringify({props: nextProps}))
      if(condition){
        this.updateAccept(nextProps)
      }
    }
    return !isEqual(JSON.stringify({props: this.props, state: this.state}), JSON.stringify({props: nextProps, state: nextState}))
  }
  updateAccept(nextProps){
    applyFilters(nextProps.props?.accept_fun, undefined, {props: nextProps}).then((accept)=>{
      this.setState({accept})
    })
  }
  remove = () => {
    const {onChange} = this.props
    onChange(null)
  }

  render() {
    const {accept: sAccept}=this.state
    const {field, width, accept} = this.props
    return (
      <div className={style.outerDiv} >
        <div className={style.icons}>
          {
            field.value != null &&<Button className={style.times} onClick={this.remove}><AiOutlineCloseCircle icon='times' color='#b7b7b7'/></Button>
          }
        </div>

        <button type="button" className={style.button}
          onClick={() => {
            this.upload.click()
          }}
          style={{width: width ? width : undefined}}>
          {
                      field.value != null ?
                          <Image file={field.value} />
                          : <AiOutlineCamera icon='camera' size='5x' color='#b7b7b7'
                            className={style.camera} />
          }

          <input type="file"
            accept={accept || sAccept}
            ref={(ref) => this.upload = ref}
            style={{display: 'none', border: 'none'}}
            onChange={this.onChangeFile.bind(this)} />
        </button>


      </div>
    )
  }
}

export default withInput()(FileUploader)
