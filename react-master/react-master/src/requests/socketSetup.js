
import { size } from "lodash-es";
import { io } from "socket.io-client";
import Request from "./Request";

export default function socketSetup(props) {
    window.socket = io(`${process.env.REACT_APP_SOCKET_URl}`, { secure: true, reconnect: true, rejectUnauthorized: false });
    window.socket.on("connect", () => {
        if(!props.state.internet){
            Request.sendRequest("status/check")
            .catch(error=>{
                props._setVal("SETVALUE", { internet: true })
            })
        }
    });
    window.socket.on('disconnect', function () {
        Request.sendRequest("status/check")
        .catch(error=>{
            props._setVal("SETVALUE", { internet: false })
        })
    });

    if(props.state?.user?.courses&&size(props.state?.user?.courses)>0){
        window.socket.emit('join rooms',{rooms:props.state?.user?.courses});
    }
}