import * as resources from './resources/index.mjs'
import * as reports from './reports/index.mjs'
import * as bill from './bill/index.mjs'
import yaml from 'js-yaml'
import fs from 'fs'
// import yaml from 'yaml'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// const __dirname = path.resolve();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const accounts = yaml.load(fs.readFileSync(__dirname+'/accounts.yaml', 'utf8'))
const settings = yaml.load(fs.readFileSync(__dirname+'/settings.yaml', 'utf8'))
// const assets = yaml.load(fs.readFileSync(__dirname+'/assets.yaml', 'utf8'))
const home = yaml.load(fs.readFileSync(__dirname+'/home.yaml', 'utf8'))
const product = yaml.load(fs.readFileSync(__dirname+'/product.yaml', 'utf8'))
// const daily_tasks = yaml.load(fs.readFileSync(__dirname+'/daily_tasks.yaml', 'utf8'))
export const apps__module = {
  ...accounts,
  ...settings,
  ...home,
  ...product,
}