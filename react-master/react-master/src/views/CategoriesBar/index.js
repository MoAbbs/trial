import React, { Component, Fragment } from "react";
import SVG from "react-inlinesvg";
import icon1 from "../../images/svg/download.svg";
import icon3 from "../../images/svg/data-analysis.svg";
import icon4 from "../../images/svg/stats.svg";
import icon5 from "../../images/svg/bulb.svg";
import icon6 from "../../images/svg/comparative.svg";
import icon7 from "../../images/svg/cash-flow.svg";
import icon8 from "../../images/svg/statistics.svg";

import icon9 from "../../images/svg/incomes.svg";

import { withTranslation } from "react-i18next";
import { Link, withRouter } from "react-router-dom";
import Styles from "./style.module.css";

class CategoriesBar extends Component {
  state = {
    showInfo: false,
  };

  handelChangeInfo = () => {
    this.setState((prevstate) => ({ showInfo: !this.state?.showInfo }));
  };
  render() {
    const { match } = this.props;
    return (
      <Fragment>
        <div className={Styles.secHeight}>
          <div className="text-center">
            <div
              onClick={this.handelChangeInfo}
              className={` ${Styles.btnSty} btn`}
            >
              Other Feature
            </div>
          </div>
          {this.state?.showInfo && (
            <div>
              <div className={`${Styles.collapseSt}`}>
                <div className="text-end">
                  <button
                    className={`${Styles.closeBtn} btn`}
                    onClick={this.handelChangeInfo}
                  >
                    <i className="far fa-times-circle"></i>
                  </button>
                </div>
                <div className={Styles.flexStyle}>
                  <div className=" me-3">
                    <Link
                      to={`/dashboard/company/input/${match?.params?.company}`}
                      className={Styles.divSty}
                    >
                      <div className={`${Styles.iconSt}`}>
                        <SVG src={icon1} />
                      </div>

                      <span>Input</span>
                    </Link>
                  </div>
                  <div className=" me-3">
                    <Link
                      to={`/dashboard/company/view/${match?.params?.company}`}
                      className={Styles.divSty}
                    >
                      <div className={`${Styles.iconSt}`}>
                        <SVG src={icon3} />
                      </div>

                      <span>View</span>
                    </Link>
                  </div>
                  <div className=" me-3">
                    <Link
                      to={`/dashboard/company/ratios/${match?.params?.company}`}
                      className={Styles.divSty}
                    >
                      <div className={`${Styles.iconSt}`}>
                        <SVG src={icon3} />
                      </div>

                      <span>Ratios</span>
                    </Link>
                  </div>

                  <div className=" me-3">
                    <Link
                      to={`/dashboard/company/growth-rate/${match?.params?.company}`}
                      className={Styles.divSty}
                    >
                      <div className={`${Styles.iconSt}`}>
                        <SVG src={icon4} />
                      </div>
                      <span>Growth Rate</span>
                    </Link>
                  </div>
                  <div className=" me-3">
                    <Link
                      to={`/dashboard/company/common-size/${match?.params?.company}`}
                      className={Styles.divSty}
                    >
                      <div className={`${Styles.iconSt}`}>
                        <SVG src={icon5} />
                      </div>
                      <span>Common Size</span>
                    </Link>
                  </div>
                  <div className=" me-3">
                    <Link
                      className={Styles.divSty}
                      to={`/dashboard/company/comparing/${match?.params?.company}`}
                    >
                      <div className={`${Styles.iconSt}`}>
                        <SVG src={icon6} />
                      </div>
                      <span>Comparing</span>
                    </Link>
                  </div>
                  <div className=" me-3">
                    <Link
                      to={`/dashboard/company/pricing/${match?.params?.company}`}
                      className={Styles.divSty}
                    >
                      <div className={`${Styles.iconSt}`}>
                        <SVG src={icon5} />
                      </div>
                      <span>Pricing</span>
                    </Link>
                  </div>
                  <div className=" me-3">
                    <Link
                      className={Styles.divSty}
                      to={`/dashboard/company/cashflow/${match?.params?.company}`}
                    >
                      <div className={`${Styles.iconSt}`}>
                        <SVG src={icon7} />
                      </div>

                      <span>Cash flow</span>
                    </Link>
                  </div>
                  <div className=" me-3">
                    <Link
                      to={`/dashboard/company/graphs/${match?.params?.company}`}
                      className={Styles.divSty}
                    >
                      <div className={`${Styles.iconSt}`}>
                        <SVG src={icon8} />
                      </div>
                      <span>Graphs</span>
                    </Link>
                  </div>
                  <div className=" me-3">
                    <div className={Styles.divSty}>
                      <div className={`${Styles.iconSt}`}>
                        <SVG src={icon9} />
                      </div>

                      <span>Income</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default withTranslation()(withRouter(CategoriesBar));
