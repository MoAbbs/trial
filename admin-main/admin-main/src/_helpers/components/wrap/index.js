import React, {Component} from 'react';
import {reduce, omit} from 'lodash';
import Main from './main'
// function Wraps(props){
//   const {WComponent, data, k} = props
//   const mainProps = omit(props, ['WComponent', 'data', 'k'])
//   return <Main WComponent={WComponent} data={data} mainProps={mainProps} />
// }
export default class wrapper extends Component {
  getWraper(WComponent, data, k) {
    return (props) =>{
      // console.log('returned', props)
      return <Main WComponent={WComponent} data={data} k={k} key={k} mainProps={props} />
    }
    // <Wraps key={k} WComponent={WComponent} data={data} k={k}></Wraps>
  }

  mappingWrappers() {
    const {component = this.props.children, wraps} = this.props;
    const MainComponent = reduce(
        wraps,
        (o, v, k) => {
          return this.getWraper(o, v, k);
        },
        component,
    );
    return MainComponent;
  }
  render() {
    const MainComponent = this.mappingWrappers();
    return <MainComponent {...omit(this.props, ['children'])} />;
  }
}
