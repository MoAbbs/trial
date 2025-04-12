import React, {Component} from 'react'
import {Button} from 'antd'
import applyFilters from '_helpers/functions/filters';
import Icon from 'components/common/icon'
import { pick, get } from 'lodash';
import { Trans } from 'react-i18next';

class Buttons extends Component {
  onClick = ()=>{
    const {button, action=button?.action} = this.props
    return applyFilters(action, undefined, {props: this.props}, this.props)
  }
  render() {
    const {MasterComponent, extra, gs, props, cs, comps, icon, shape, htmlType='button', classes, className='', picks=[], _type="primary", classNames='', text=<MasterComponent comps={comps} {...{...gs, gs}} {...props} {...pick(this.props, picks)} />, onPress=this.onClick} = this.props

    return (
      <Button type={_type} {...extra} htmlType={htmlType} onClick={onPress} shape={shape} className={`${get(classes, props?.cs || cs, '')} ${className} ${classNames}`} icon={icon ? <Icon {...icon}/>:false}>
        {this.props.text ? <Trans>{text}</Trans>:text}
      </Button>
    )
  }
}
export default Buttons;
