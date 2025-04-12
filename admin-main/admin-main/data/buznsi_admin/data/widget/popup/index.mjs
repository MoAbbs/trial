import yaml from 'js-yaml'
import fs from 'fs'
// import yaml from 'yaml'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// const __dirname = path.resolve();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__filename)
export const buznsi_admin_popup_create = yaml.load(fs.readFileSync(__dirname+'/form.yaml', 'utf8'))
export const buznsi_file_upload = yaml.load(fs.readFileSync(__dirname+'/upload_excel.yaml', 'utf8'))
export const buznsi_admin_inner_form = yaml.load(fs.readFileSync(__dirname+'/inner_form.yaml', 'utf8'))
export const buznsi_admin_fields_form = yaml.load(fs.readFileSync(__dirname+'/fields.yaml', 'utf8'))
