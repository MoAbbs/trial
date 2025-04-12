import applyFilters from '_helpers/functions/filters';
import indexDB, {addToIndexDB} from 'config/index_db'
import {isEmpty} from 'lodash'
// import axios from 'axios'
// import moment from 'moment-timezone'
// import {API_URL} from '_config';


// const sync_stock_apps = {
//   to_gun: {
//     'stock__balance': {gun_db: 'st'},
//     'stock__balance_trans': {gun_db: 'st'},
//     'stock__weight_price': {gun_db: 'st'},
//   },
//   check_update: {
//     'stock__transaction_ro_detail': {},
//     'stock__transaction_tr_detail': {},
//     'stock__purchase_orders_detail': {},
//   },

// }
export const syncSocketData = (action, syncing_data, create) => {
  const socket = applyFilters({path: `sockets.location`})
  if (syncing_data && !isEmpty(action) && socket) {
    const station_id = applyFilters({path: `licensing__station.active`})
    const station = applyFilters({path: `licensing__station.data.${station_id}`}) || {}
    const data = action.filter((d)=>(
      !d.type.includes('req_line') && d.type.includes('_') &&
            ((!d.type.includes('set_main')) || (!station.printing && d.type.includes('Printing')))
    ));
    // let balances_data = []
    // data.map((single_data) => {
    //     const {type, data} = single_data
    //     if (type.includes("set_data")) {
    //         let app = replace(type, 'set_data_', '')
    //         if(create && has(sync_stock_apps.check_update, app)) {
    //             balances_data = syncStockBalances(app, data)
    //         }

    //     }
    // })
    // data = [...data, ...balances_data]
    if (!isEmpty(data)) {
      // console.log("To SOCKET", data)
      addToIndexDB(indexDB.location, data, {store: 'syncs'}).then((db_data) => {
        const syncs = {...db_data, id: station_id}
        socket.emit('syncLocal', {...syncs, location_id: station.location}, (date)=>{})
      });
    }
  }
}


// function syncStockBalances(app, data) {
//   const updated_at = get(data, 'updated_at', get(data, '0.updated_at'))
//   const filter = {updated_at__gte: moment(updated_at).subtract(10, 'seconds').utc().format()}
//   const stock_data = mapValues(sync_stock_apps.to_gun, ((v) => {
//     return ({filter})
//   }))
//   return axios.post(`${API_URL}multi_query/`, stock_data)
//       .then(({data}) => {
//         return map(data, (table_data, table_name) => {
//           return {
//             type: `set_data_${table_name}`,
//             data: table_data,
//           }
//         })
//       })
// }
