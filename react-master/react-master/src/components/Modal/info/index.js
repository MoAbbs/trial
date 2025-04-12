import React, { useState } from 'react'
import Modal from "components/Modal/main";

export default function InfoModal({item}) {
    const [state, setState] = useState({
        show: false
    })
    return (
        <div>
            <span
                onClick={() => { setState({ ...state, show: true }) }}
            >
                info
            </span>
            <Modal show={state?.show} handleClose={() => { setState({ ...state, show: false }) }}
                title={`${item?.name} info`} closeBtn="close"

            >
               {item?.info}
            </Modal>
        </div>
    )
}
