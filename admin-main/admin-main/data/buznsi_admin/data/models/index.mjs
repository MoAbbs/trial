import yaml from 'js-yaml'
import fs from 'fs'
// import yaml from 'yaml'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// const __dirname = path.resolve();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const models = yaml.load(fs.readFileSync(__dirname+'/models.yaml', 'utf8'))
export const apps__model = {
  ...models
}