import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {filter, get, map} from 'lodash'
// import {Trans} from 'react-i18next'
import {Select} from 'antd'
import withInput from '_helpers/components/wrap/funs/input'
// import { id_key } from '_config'
import applyFilters from '_helpers/functions/filters'
import search from '_helpers/components/wrap/funs/search'
import cssClasses from './style.module.less'
const { Option } = Select;
class MainSelect extends Component {
  state={}
  filteredOptions(val, option) {
    const {search} = this.props;

    const searchfilter = search
      ? search
      : {key: 'object/GetDataSelector', show: 'name', trans: false};
    return applyFilters(
        {
          key: 'list/deepOptionSearch',
          value: val,
          search: searchfilter,
        },
        option.props.option
    );
    // return get(option ,"props.name" ,'').toLowerCase().includes(val.toLowerCase())
  }
  renderOptions(){
    const {show, MasterComponent, list, colValue,} = this.props
    // const {show: stateShow} = this.state
    // if(!stateShow){
    //   return <Fragment></Fragment>
    // }
    return map(filter(list, Boolean), (d, index) => {
      return (
        <Option
          option={d}
          key={get(d, colValue, d.id)}
          value={get(d, colValue, d.id)}
        >
          <MasterComponent {...show} item={d}/>
        </Option>
      );
    });
  }
  changeShow = (show)=>{
    this.setState({show})
  }
  render() {
    const {field={}, mode='default', t, handleSearch, pl="Please Select", mainValue=field.value, classes, extra={}, onChange, props, cs=props.cs} = this.props
    const css = get(cssClasses, cs, get(classes, cs, null))
    // console.log(cssClasses)
    return (
      <Select onDropdownVisibleChange={this.changeShow} value={mainValue} onChange={onChange} mode={mode} onSearch={handleSearch}
      showSearch={true} placeholder={t(pl)} filterOption={false} dropdownClassName={css} {...{...props, ...extra}}>
          {this.renderOptions()}
      </Select>
    )
  }
}

const mapStateToProps = (state, props) => ({
  list: props.props?.data || props.data || get(state, `${props.reduxName}.data`, get(state, props.path, {})),
  show: props.show || {comp: {type: 'common.label'}, fun: {key: 'common/RunDataFunction', fun:'show', path: `fields.data.${props.reduxName}.fields.name`, default: {key: 'object/GetDataSelector', path: 'props.item', show: 'name'}}},
})


export default connect(mapStateToProps)(withInput()(search({list: 'list', key: 'list/Search'})(MainSelect)))
