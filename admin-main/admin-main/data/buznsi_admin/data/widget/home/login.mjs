export const buznsi_admin_login = {
  "id": "buznsi_admin_login",
  "app": "buznsi_admin",
  "s_class": "home/login.module.less",
  "wraps": {
    "Form": {
      init: {
        key: 'common/resetData',
        reset: {app: 'swra'},
        then: {
          key: 'store/inited'
        }
      },
      "onSubmit": {
        "key": "request/login",
        fail: {
          key: 'object/StateSelector',
          path: 'error.response.data.msg',
          then: {
            key: 'msg/alert',
            type: 'error',
          }
        },
        then: {
          key: 'store/Dispatching',
          fun: 'set_main_main',
          then: {
            key: 'route/QueryParams',
            // qs: true,
            param: 'module',
            default: 'home',
            then: {
              key: 'strings/prefix',
              prefix: '/',
              then: {
                key: 'route/replace',
              }
            }
          },
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
  comp: {
    type: 'layout.style',
  },
  "comps": {
    "body": {
      "type": "layout.style",
      props: {
        cs: 'body'
      },
      comps: {
        logo: {
          type: 'layout.style',
          props: {
            cs: 'img'
          },
          comps:{
            img: {
              type: 'common.image',
              extra: {
                preview: false
              },
              image: {key: 'request/publicFile', file: 'buznsi.png'}
            }
          }
        },
        "username": {
          "ph": "Input Username", "type": "layout.widget", "w_type": "buznsi_admin_field", "data": {"label": "Email", "_type": "text", "model": "username", "validates": {"required": true}}
        },
        "password": {
          "ph": "Input Password", "type": "layout.widget", "w_type": "buznsi_admin_field", "data": {"label": "Password", "_type": "password", "model": "password", "validates": {"required": true}}
        },
        btns: {
          "type": "common.input",
          _type: 'design.master',
          item: {
            wrapperCol: {offset: 8}
          },
          props: {
            comps: {
              submit: {
                type: 'common.button',
                text: 'Login',
                _type: 'primary',
                htmlType: 'submit',
                action: {
                  key: 'form/Action',
                },
              },
              forget: {
                wraps: {
                  route: {}
                },
                type: 'common.button',
                text: "Forget Password",
                _type: "text",
                action: {
                  key: 'route/navigate',
                  path: '/forget-pass',
                },
              },
            }
          },
        }
        // create: {
        //   comps: {
        //     text: {
        //       type: 'common.text',
        //       value: 'New User Create an account',
        //     },
        //   },
        //   action: {
        //     key: 'route/navigate',
        //     nav: 'section',
        //     path: '/register',
        //   },
        // },
      }
      // }
    }
  }
}