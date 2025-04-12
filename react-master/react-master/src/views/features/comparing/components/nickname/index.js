import React, { useState } from 'react'
import Request from '../../../../../requests/Request'

export default function NickName({ companyItems, handelClose, handelSubmit }) {
    const [nickName, setNickName] = useState("")
    const handelSave = () => {
        const data = {
            data: {
                Product__company_items: [
                    {
                        id: companyItems?.id,
                        nickName: nickName
                    }
                ]
            }
        }
        Request.sendRequest("update_models/", data)
            .then(res => {
                const item = res?.data?.Product__company_items[0]
                handelSubmit(item)
            })
    }
    // console.log(companyItems, "asdkasndlkn klnads klnasd lknasd")
    return (
        <div>
            <div className="d-flex align-items-center justify-content-around">
                <label className="fw-bolder w-25">nickname : </label>
                <input className="form-control w-75"
                    value={nickName}
                    onChange={(e) => { setNickName(e.target.value) }}
                />
            </div>
            <div className="m-3 d-flex align-items-center justify-content-center">
                <button className="btn btn-primary m-1"
                    onClick={handelSave}
                >save</button>
                <button className="btn btn-danger m-1"
                    onClick={handelClose}
                >close</button>
            </div>
        </div>
    )
}
