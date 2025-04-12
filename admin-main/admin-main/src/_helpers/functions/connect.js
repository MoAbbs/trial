import {buildReducers} from 'store/reducers/main';

export default (app, props)=>{
  // const mapDispatchToProps = appActions(app);
  // const MainComponent = Component
  // console.log(app)
  props.store.attachReducers(buildReducers(app.name))
  return true
}
