import React, { Fragment } from "react";
import { withTranslation } from "react-i18next";
import img1 from "../../../../images/home/img888.png";
import icon1 from "../../../../images/home/wall-clock.svg";

import SVG from "react-inlinesvg";

import Styles from "./style.module.css";

const IncreaseValue = (props) => {
  return (
    <Fragment>
      <div className="container mt-5">
        <div className="row align-items-center justify-content-center mb-5">
          <div className="col-lg-6 mb-5 pe-5">
            <div>
              <span className={Styles.tagsSt}>Money Management</span>
              <div className={`${Styles.headTxt} d-block`}>
                Increase the Value of Your
                <br /> Money
              </div>
              <span className={Styles.TxtSt}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </span>
              <div className="row mt-4">
                <div className="col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div className={`${Styles.iconSt}`}>
                      <SVG src={icon1} />
                    </div>
                    <span className={Styles.trendTxtSt}>Secure Money</span>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div className={`${Styles.iconSt}`}>
                      <SVG src={icon1} />
                    </div>
                    <span className={Styles.trendTxtSt}>Trending Report</span>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div className={`${Styles.iconSt}`}>
                      <SVG src={icon1} />
                    </div>
                    <span className={Styles.trendTxtSt}>Flawless Credit</span>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div className={`${Styles.iconSt}`}>
                      <SVG src={icon1} />
                    </div>
                    <span className={Styles.trendTxtSt}>Correct Analysis</span>
                  </div>
                </div>
              </div>
              <button className={`${Styles.firstBtn} btn`}>
                Request Free Demo
              </button>
            </div>
          </div>
          <div className="col-lg-6">
            <div>
              <img src={img1} alt="first" className={Styles.imgSt} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withTranslation()(IncreaseValue);
