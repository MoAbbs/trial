import React from 'react'
import { withTranslation } from 'react-i18next'
import InlineSVG from 'react-inlinesvg/esm'
import { withRouter } from 'react-router'

function Back(props) {
    const handelBack = () => {
        props.history.goBack();
    }
    const { t } = props
    return (
        <span className="svg-icon svg-icon-3x text-hover-primary text-hover"
            onClick={handelBack}
        >
            {t("Back")}
            <InlineSVG src={`${process.env.REACT_APP_API_URl}/images/svg/${t("app_lang") === "en" ? "Arrow-left.svg" : "Arrow-Right.svg"}`} title={t("create")} />
        </span>
    )
}
export default withTranslation()(withRouter(Back))
