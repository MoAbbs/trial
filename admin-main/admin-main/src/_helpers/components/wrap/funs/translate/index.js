import { withTranslation } from 'react-i18next';
export default (data)=>{
  return function MasterComponent(MComponent) {
    return withTranslation()(MComponent)
  }
}
