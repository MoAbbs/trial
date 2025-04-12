export const buznsi_admin_home = {
  "id": "buznsi_admin_home",
  "app": "buznsi_admin",
  "comps": {
    "header": {"type": "layout.widget", "w_type": "buznsi_admin_header"},
    "body": {
      type: 'layout.style',
      s_class: 'home/home.module.less',
      comps: {
        body: {
          type: "layout.style",
          cs: 'list',
          comps: {
            list: {
              "type": "common.normal_list",
              picks: ['classes'],
              fun: {
                key: 'list/Reject',
                path: 'props.list',
                "params": {"url": "home"},
                then: {
                  key: 'list/SortBy',
                  keys: ['_index']
                }
              },
              "wraps": {
                "connect": {
                  "list": "${fun}"
                }
              },
              "card": {
                comp: 'common.button',
                _type: 'text',
                wraps: {
                  route: {}
                },
                action: {
                  key: 'common/RunDataFunction',
                  path: 'props.item',
                  fun: 'action',
                },
                picks: ['classes'],
                cs: 'item',
                comps: {
                  "icon": {"type": "common.icon", "type_fun": {key: 'common/noop', "path": "props.item.icon"}},
                  "title": {"type": "common.text", _type: "Title", "fun": {key: 'common/noop', "path": "props.item.name"}}
                }
              }
            }
          }
        }
      }
    }
  }
}

export const buznsi_admin_field = {
  "id": "buznsi_admin_field",
  "app": "buznsi_admin",
  "wraps": {
    condition: {
      key: 'list/Every',
      funs: '${per}',
    }
  },
  "comp": {
    "type": "common.input"
  },
  "props": {
    placeholder: "${ph}",
    "label": "${label}", 
    "_type": "${_type}", 
    "name": "${model}",
    props: '${props}'
  },
}