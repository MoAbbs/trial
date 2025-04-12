import {Formik, useFormikContext} from 'formik'
import React, {Component} from 'react'
import applyFilters from '_helpers/functions/filters';
import {get, isEqual, pick} from 'lodash'
import {Form as $Form} from 'antd'
import plain_performance from '../plain_performance';
class Form extends Component {
  shouldComponentUpdate(nextProps) {
    const deps = nextProps?.deps;
    return !isEqual(get(nextProps, deps), get(this.props, deps));
  }
  render() {
    const {MainComp, form, name} = this.props;
    const mainProps = pick(this.props, ['submitForm', 'handleChange', 'resetForm', 'isValid', 'validateForm'])
    if(name){
      applyFilters({key: 'store/Dispatching', dis: [{type: 'set_main_form', data: {[name]: pick(this.props, ['submitForm', 'validateForm', 'handleChange'])}}]})
    }
    return <$Form {...form} onFinish={this.props.handleSubmit}>
      <MainComp {...mainProps} />
    </$Form>
  }
}
class formComponent extends Component {
  state = {}
  constructor(props){
    super(props)
    
    applyFilters(this.props.init, undefined, {props: this.props}).then(initValues=>{
      this.setState({loading: true, initValues})
    })
  }
  handleSubmit = (values, props)=>{
    // console.log(this.props.onSubmit)
    return applyFilters(this.props.onSubmit, values, {props: {...this.props, ...props, values}});
  }
  shouldComponentUpdate(nextProps, nextState){
    return !isEqual(nextState, this.state)
  }
  render() {
    const {initValues, loading} = this.state
    if(!loading){
      return <></>
    }
    return (
      <Formik onSubmit={this.handleSubmit.bind(this)} initialValues={initValues||{}} {...this.props.extra}>
        {(props)=>{
          return <Form {...{...this.props, ...props}} />
        }}
      </Formik>
    )
  }
}
export default formComponent