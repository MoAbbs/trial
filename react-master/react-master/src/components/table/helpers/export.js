import InlineSVG from "react-inlinesvg/esm"

const Export = ({t}) => {
    
    return (
        <div>
            <div className="dropdown mr-2">
                <div
                    className=" btn btn-bg-white font-weight-bolder"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {t("Export")} <i className="fas fa-chevron-down fa-xs"></i>
                </div>
                <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                    <ul className="navi flex-column navi-hover py-2">
                        <li className="navi-item">
                            <div href="#" className="navi-link">
                                <span className="svg-icon svg-icon-md">
                                    <InlineSVG src={`${process.env.REACT_APP_API_URl}/images/svg/Plus.svg`} />
                                </span>{" "}
                                <span className="navi-text">{t("Print")}</span>
                            </div>
                        </li>
                        <li className="navi-item">
                            <div href="#" className="navi-link">
                                <span className="svg-icon svg-icon-md">
                                    <InlineSVG src={`${process.env.REACT_APP_API_URl}/images/svg/Plus.svg`} />
                                </span>{" "}
                                <span className="navi-text"
                                
                                >PDF</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )

}
export default Export