import * as apps from './apps/index.mjs'
import * as modules from './module/index.mjs'
import * as widgets from './widget/index.mjs'
import * as fields from './fields/index.mjs'
import * as files from './files//index.mjs'
import * as models from './models/index.mjs'
const all_apps = {
  ...apps,
  ...widgets,
  ...modules,
  ...fields,
  ...models,
  ...files
}
export default all_apps;