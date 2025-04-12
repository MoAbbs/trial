import { withRouter } from 'react-router-dom';
export default (data)=>{
  return function MasterComponent(MComponent) {
    return withRouter(MComponent)
  }
}
