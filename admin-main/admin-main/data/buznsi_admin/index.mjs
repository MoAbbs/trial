import data from './data/main.mjs'
import fs from 'fs';
import _ from 'lodash';
import axios from 'axios'
let url = `http://localhost:8010/api/v1/update_models/`
if(process.env.prod){
  url = 'https://api.bznsi.com/api/v1/update_models/'
}
console.log(url);
const req = {data: _.mapValues(data, d=>(_.toArray(d))), reset: true}
fs.writeFileSync('./buznsi.json', JSON.stringify(req, null, 2))
axios.post(url, req)