import { serialize } from 'object-to-formdata';
import {post} from 'axios'
import {message} from 'antd';

export const upload_excel = async (params)=>{
  const input = document.createElement('input');
  let parameters = params.params;
  input.type = 'file';
  input.accept = params.accept || "";
  input.multiple = params.multiple || false;
  input.click();
  return new Promise((resolve, reject)=>{
    input.onchange = function(ev){
      const req = {
        file: this.files[0],
        params: parameters,
        ...params.params
      }
      const form = serialize(req)
      post(params.url || '/api/v1/upload_excel/', form, {headers: {
        'content-type': 'multipart/form-data',
      }}).then(({data})=>{
        window.location.reload();
      }).catch(t=>{
        message.error('Error Uploading Excel File');
        reject(t)
      })
      return false
    }
  })
  // return axios.post(params.url || '/api/v1/upload_excel', )
}