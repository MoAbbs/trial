import {get} from 'lodash'
// import applyFilters from '_helpers/functions/filters';

export const social__message = (s, data, all_d, state)=>{
  if(state.main.user.id != data[0].sender){
    window.$('.play-sound').click()


    //open_instantance_chat

    let chat_id = data[0].chat
    window.handelOpenChat(chat_id)


    var synth = window.speechSynthesis;
    const voice = synth.getVoices()[3];
    let speech = new SpeechSynthesisUtterance("New message recieved");
    speech.lang = "en-US";
    // speech.text = ;
    speech.volume = 1;
    // console.log(synth)
    speech.voice = voice;
    speech.rate = 1;
    speech.pitch = 1;                
    setTimeout(() => {
      synth.speak(speech);
    }, 100);
  }
  const ch = get(state.auth__user.data, state.main.user.id, '')
  ch.n_chat += data.length
  window.$(".chat-content ul").animate({scrollTop: window.$(".chat-content ul").prop('scrollHeight')}, 200);
  return [{
    type: 'set_data_auth__user',
    data: [ch]
  }, {
    type: 'set_path_main',
    path: 'user.n_chat',
    data: ch.n_chat
  }]
}
export const social__notification = (s, data, all_d, state)=>{
  const ch = get(state.auth__user.data, state.main.user.id, '')
  ch.n_notify = ch.n_notify || 0;
  ch.n_notify += data.length
  return [{
    type: 'set_data_auth__user',
    data: [ch]
  }, {
    type: 'set_path_main',
    path: 'user.n_notify',
    data: ch.n_notify
  }]
}

export const social__room = (s, data, all_d, state)=>{
  const res = {
    call:data[0]
  }
  return [{
    type: 'set_main_main',
    data: res
  }]
}