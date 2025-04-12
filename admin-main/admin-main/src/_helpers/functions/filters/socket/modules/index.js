export const start_call = (data, props)=>{
  // console.log('here we start calling', data)
  // here we start calling
  const state = props.store.getState()
  if(data?.type=="start__call" && state?.call?.data?.status!="inCall")
  {
    let storeData = {
      revciever:true,
      caller:data?.caller,
      call:true,
      status :"recieve",
      type:data?.callType
    } 
    props.applyFilters({ key: 'Dispatching', fun: 'set_data_call' }, storeData);
  }
  else if(data?.type =="accept__call")
  {
    window.stopRing()
    let storeData = {
      revciever:true,
      sender:false,
      call:true,
      status :"inCall",
      room_no : data?.room_no
    }
    props.applyFilters({ key: 'Dispatching', fun: 'set_data_call' }, storeData);
    window.open(`/conference?room_no=${data?.room_no}`, "_blank" , "location=yes,height=570,width=520,scrollbars=yes,status=yes");
  }
  else if ( data?.type =="reject__call" || data?.type =="cancelled__call")
  {
    let storeData = {
      revciever:false,
      sender:false,
      caller:null,
      call:false ,
      status : null
    } 
    props.applyFilters({ key: 'Dispatching', fun: 'set_data_call' }, storeData);
    setTimeout(()=>{
      if(window.stopRing){window.stopRing()}
      if(window.handelGVideoLeaveCall){window.handelGVideoLeaveCall()}
      if(window.handelGLeaveVoiceCall){window.handelGLeaveVoiceCall()}
    },200)
  }

}
