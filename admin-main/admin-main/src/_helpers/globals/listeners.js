export default (then)=>({
  key: 'chat.addListeners',
  listeners: {
    'client': {
      fun: {
        key: 'reverseKeys',
        levels: ['client', 'unit'],
        then: {
          key: 'mapExtraData',
          fun: {
            key: 'multiApply',
            apps: {
              id: {
                key: 'joining',
                separate: '__',
                funs: {
                  client: {key: 'GetDataSelector', show: 'client'},
                  unit: {key: 'GetDataSelector', show: 'unit'},
                },
              },
            },
          },
        },
      },
      ref: {
        key: 'strings/replaceTemplate',
        str: '/chat/rooms',
      },
      dis: {
        type: 'set_data_chats',
        path: 'groups.chat',
      },
    },
    'notify': {
      ref: {
        key: 'strings/replaceTemplate',
        str: '/chat/notify/user/:id',
      },
      dis: {
        type: 'set_path_chats',
        path: 'notify.user',
      },
    },
    'pin': {
      ref: {
        key: 'strings/replaceTemplate',
        str: '/chat/pinned/:id',
      },
      dis: {
        type: 'set_path_chats',
        path: 'pinned.user',
      },
    },
    'public': {
      ref: {
        key: 'strings/replaceTemplate',
        str: '/chat/notify/public',
      },
      dis: {
        type: 'set_path_chats',
        path: 'groups.notify.public',
      },
    },
    'team': {
      ref: {
        key: 'strings/replaceTemplate',
        str: '/chat/notify/:team',
      },
      dis: {
        type: 'set_path_chats',
        path: 'groups.notify.team',
      },
    },
  },
  then: {
    key: 'chat.createChatsListeners',
    then,
  },
})
