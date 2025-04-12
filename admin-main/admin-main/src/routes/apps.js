export const getApps = (app)=>({
  apps__app: {filter: {id: app}},
  apps__init: {filter: {$or: [{app}, {app: {$exists: false}}]}},
  apps__widget: {filter: {$or: [{app}, {app: {$exists: false}}]}},
  apps__module: {filter: {$or: [{app}, {app: {$exists: false}}]}},
  apps__field: {filter: {$or: [{app}, {app: {$exists: false}}]}},
  apps__func: {filter: {$or: [{app}, {app: {$exists: false}}]}},
  settings__lang: {}
})