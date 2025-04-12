import moment from 'moment'
import {get} from 'lodash'
export const car_package = (params, data, state, props)=>{
  const car = get(state.swra__car.data, data.car);
  const format = "YYYY MM DD";
  return moment(car?.license_expiry_date).format(format) > moment().format(format)
}
export const driver_package = (params, data, state, props)=>{
  const driver = get(state.swra__profile.groups.user, data.driver);
  const format = "YYYY MM DD";
  const now =  moment().format(format)
  const lic_expire = moment(driver?.driver_license_expiry_date).format(format) > now
  const checkup_expire = moment(driver?.medical_checkup_expiry_date).format(format) > now
  const ddc_expire = moment(driver?.DDC_expiry_date).format(format) > now
  return lic_expire && checkup_expire && ddc_expire
}