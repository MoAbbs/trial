import React, {Component} from 'react'
import {Button, Popover} from 'antd'
import applyFilters from '_helpers/functions/filters';
import Icon from 'components/common/icon'
import { pick, get } from 'lodash';

class Buttons extends Component {
  onClick = ()=>{
    const {button, action=button?.action} = this.props
    return applyFilters(action, undefined, {props: this.props}, this.props)
  }
  render() {
    const {MasterComponent, title, content, pop, extra, gs, props, cs, comps, icon, shape, htmlType='button', classes, className='', picks=[], _type="primary", text=<MasterComponent comps={comps} {...{...gs, gs}} {...props} {...pick(this.props, picks)} />, onPress=this.onClick} = this.props
    const title_comp = title ? (props)=>(<MasterComponent {...title}></MasterComponent>):undefined
    const content_comp = content ? (props)=>(<MasterComponent {...content}></MasterComponent>):undefined

    return (
      <Popover {...pop} title={title_comp} content={content_comp}>
        <Button type={_type} {...extra} htmlType={htmlType} onClick={onPress} shape={shape} className={`${get(classes, props?.cs || cs, '')} ${className}`} icon={icon ? <Icon {...icon}/>:false}>
          {text}
        </Button>
      </Popover>
    )
  }
}
// make error
// export default withRoute(withNavigation(Buttons))
export default Buttons;
