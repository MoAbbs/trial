// import logo from './logo.svg';
import React, {Component} from 'react';
import './App.css';
import Routes from './routes'
import {get} from 'lodash'
import {connect} from 'react-redux'
import {APP} from '_config'
import BasicComponent from '_helpers/components/wrap/funs/basic';
import {ConfigProvider} from 'antd'
// import { withTranslation } from 'react-i18next';
class App extends Component {
  state = {}
  constructor(props){
    super(props)
    this.compares = {
      forms: {
        compare: ['app', 'lang'],
        action: this.resetConfig.bind(this),
        first_compare: true,
      },
    }
  }
  resetConfig(props){
    if(props.lang && props.app){
      import(`./styles/${props?.lang?.dir}.css`)
      // s_updateExtra({classes});
      // this.setState
      ConfigProvider.config({
        theme: props.app.theme,
        direction: props.lang.dir
      })
    }
    if(props?.app?.id){
      import(`./styles/${props?.app?.id}.css`)
    }
  }
  render(){
    return (
        <BasicComponent compare={this.compares} {...this.props}>
          <div className="min-w-screen min-h-screen" dir={this.props.lang?.dir}>
            <Routes />
          </div>
        </BasicComponent>
    );
  }
}

export default connect((state)=>({lang: get(state.settings__lang?.data, state.main.lang, ''), app: get(state.apps__app?.data, APP, '')}))(App);
