export const buznsi_admin_header = {
  "id": "buznsi_admin_header",
  "app": "buznsi_admin",
  "comps": {
    "body": {
      wraps: {route: {}},
      "type": "layout.style", "s_class": "home/header.module.less",
      comps: {
        "logo": {
          "type": "common.image",
          extra: {
            preview: false
          },
          width: 70,
          image: {key: 'request/publicFile', file: 'buznsi.png'}
        },
        title: {
          wraps: {
            connect: {
              module: {
                key: 'list/Find', path: 'apps__module.data', params: {url: 'props.match.params.module'},
                then: {
                  key: 'strings/replaceTemplate', str: 'apps__module.data.:id'}
                }
          },
            route: {}
          },
          type: 'layout.style',
          props: {cs: 'title'},
          picks: ['module'],
          comps: {
            icon: {
              type: 'common.icon',
              type_fun: {
                path: 'props.module.icon'
              }
            },
            text: {
              type: 'common.text',
              _type: 'Title',
              fun: {
                path: 'props.module.name'
              }
            }
          }
        },
        btns: {
          type: 'layout.style',
          props: {cs: 'btn'},
          comps: {
            apps:{
              wraps: {
                route: {}
              },
              action: {key: 'route/replace', path: '/home'},
              type: 'common.button',
              _type: 'link',
              comps: {
                icon: {
                  type: 'common.icon',
                  _type: 'ai',
                  name: 'AiFillAppstore'
                }
              },
            },
            profile: {
              type: 'common.popover',
              _type: 'link',
              shape: 'circle',
              pop: {
                trigger: 'click'
              },
              content: {
                comp: 'layout.style',
                s_class: 'home/profile.module.less',
                comps: {
                  profile: {
                    type: 'common.button',
                    _type: 'text',
                    text: 'profile',
                  },
                  logout: {
                    wraps: {
                      route: []
                    },
                    type: 'common.button',
                    _type: 'text',
                    text: 'Logout',
                    action: {
                      key: 'store/Dispatching',
                      dis: [{type: 'reset_all_main', data: {}}],
                      then: {
                        key: 'route/replace',
                        path: '/login'
                      }
                    }
                  }
                }
              },
              comps: {
                avatar: {
                  type: 'common.avatar',
                  fun: {path: 'main.user.name.first_name'},
                }
              }
            }
          }
        }
      }
    },
  }
}