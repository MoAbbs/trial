import React, { useState } from "react";
import Styles from "./style.module.css"
import Request from "../../../requests/Request";
import Spinner from "../../Loader/Spinenr";

const COffline = ({ props }) => {
    const [loading, setLoading] = useState(false)
    const handelReload = () => {
        setLoading(true)
        Request.sendRequest("status/check")
            .then(res => {
                props._setVal("SETVALUE", { internet: true })
            })
            .catch(error=>{
                setLoading(false)
            })
    }
    return (
        <div className={Styles.offline_container} >
            <div className={Styles.offline_content}>
                <div className={Styles.icon}><i className="fas fa-wifi"></i></div>
                <span className={Styles.title}>{props?.state?.lang === "en" ? "You're offline. Check your connection." : "انت الان غير متصل بالانترنت .تفقد اتصالك بالشبكة"}</span>
                {loading ?
                    <div className={Styles.refresh}> <Spinner /> </div>
                    : <div className={Styles.refresh}
                        onClick={handelReload}
                    >{props?.state?.lang === "en" ? "Refresh" : " إستعادة"}</div>
                }
            </div>
        </div>
    )
}
export default COffline