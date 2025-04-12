import Modal from 'react-bootstrap/Modal'
import React from 'react'
import { withTranslation } from 'react-i18next'

function Main(props) {
    const { show, title, save, closeBtn, t } = props
    return (
        <Modal show={show} onHide={props.handleClose} dialogClassName={t("app_lang") === "en" && "ar_app"}>
            <Modal.Header >
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            {(closeBtn || save) && (
                <Modal.Footer>
                    {closeBtn && <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal"
                        onClick={props.handleClose}
                    >{closeBtn}</button>}
                    {save && <button type="button" className="btn btn-primary font-weight-bold"
                        onClick={props.handleSubmit}
                    >{save}</button>}
                </Modal.Footer>
            )}
        </Modal>
    )
}
export default withTranslation()(Main)
