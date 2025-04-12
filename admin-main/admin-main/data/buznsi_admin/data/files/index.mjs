import yaml from 'js-yaml'
import fs from 'fs'
// import yaml from 'yaml'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// const __dirname = path.resolve();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const files = yaml.load(fs.readFileSync(__dirname+'/files.yaml', 'utf8'))
const sheets = yaml.load(fs.readFileSync(__dirname+'/sheets.yaml', 'utf8'))
export const apps__files = {
  ...files
}
export const apps__sheets = {
  ...sheets
}