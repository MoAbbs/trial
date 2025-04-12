import {buildReducers} from 'store/reducers/main';

export default (app, props)=>{
  // const mapDispatchToProps = appActions(app);
  props.store.attachReducers(buildReducers(app))
  return app
}
