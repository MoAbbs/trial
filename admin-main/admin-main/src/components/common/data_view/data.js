export const boolean = {
  comp: 'layout.style',
  s_class: "home/icon.module.less",
  comps: {
    icon: {
      type: 'common.icon',
      picks: ['item', 'val', 'classes'],
      type_fun: {
        key: 'common/condition',
        path: 'props.val',
        success: {
          key: 'common/resetData',
          reset: {
            type: 'ai',
            name: 'AiOutlineCheckCircle',
            cs: 'active',
          }
        },
        fail: {
          key: 'common/resetData',
          reset: {
            type: 'ai',
            name: 'AiOutlineCloseCircle'
          }
        }
      }
    }
  }
}
export const bool = boolean
export const string = {
  comp: 'common.label',
  fun: {path: 'props.val'},
  trans: false
}
export const date = {
  comp: 'common.label',
  fun: {
    key: 'date/FormatDate',
    path: 'props.val'
  },
  trans: false
}
export const datetime = {
  comp: 'common.label',
  fun: {
    key: 'date/FormatDate',
    path: 'props.val',
    format: 'DD-MM-YYYY HH:mm'
  },
  trans: false
}
export const one_ref = {
  comp: 'common.label',
  fun: {
    key: 'object/chain',
    dis_fun: {
      key: 'object/StateSelector',
      path: '$[props.col.show]',
      default: 'name'      
    },
    selectors: {
      "app": {path: '$[props.col.app].data.$[props.val]'}
    }
  },
  trans: false
}
export const one_embed = {
  comp: 'common.label',
  fun: {
    key: 'object/chain',
    dis_fun: {
      key: 'object/StateSelector',
      path: '$[props.col.show]',
      default: 'name'
    },
    selectors: {
      "app": {path: 'props.val'}
    }
  },
  trans: false
}
export const show_fun = {
  comp: 'common.label',
  fun: {
    key: 'common/RunDataFunction',
    path: 'props.col',
    fun: 'show',
  },
  trans: false
}
export const object = {
  comp: 'common.label',
  fun: {
    key: 'common/RunDataFunction',
    path: 'props.col',
    fun: 'show',
  },
  trans: false
}
export const design = {
  object: {
    comp: 'common.label',
    fun: {
      key: 'common/RunDataFunction',
      path: 'props.col',
      fun: 'show',
    },
    trans: false
  }
}
export const select = {
  comp: 'common.label',
  fun: {
    key: 'common/RunDataFunction',
    path: 'props.col',
    fun: 'show',
  },
  trans: false
}
export const file = {
  comp: 'common.file',
}