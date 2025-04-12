export const buznsi_admin_popup_create = {
  id: 'buznsi_admin_popup_create',
  app: 'buznsi_admin',
  "s_class": "home/login.module.less",
  "wraps": {
    "Form": {
      "onSubmit": {
        "key": "request/updating",
        then: {
          key: 'store/Dispatching',
          dis: [{type: 'set_main_popup', data: {popup: {}}}],
          
        }
      },
      form: {
        size: 'large',
        labelCol:{ span: 4 },
        wrapperCol:{ span: 20 }
      }
    },
    "route": {}
  },
}