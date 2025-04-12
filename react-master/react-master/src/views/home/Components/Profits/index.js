import React, { Component, Fragment } from "react";
import SVG from "react-inlinesvg";
import icon1 from "../../../../images/home/wall-clock.svg";
import icon2 from "../../../../images/home/analytics.svg";
import icon3 from "../../../../images/home/guarantee.svg";
import Styles from "./style.module.css";

export default class Profits extends Component {
  render() {
    return (
      <Fragment>
        <div className={`${Styles.secWidth} py-5`}>
          <div className="row">
            <div className="col-xl-4 col-md-6 mb-4">
              <div>
                <div className="d-flex align-items-center">
                  <div className={`${Styles.iconSt}`}>
                    <SVG src={icon1} />
                  </div>
                  <div className="d-flex flex-column">
                    <div className={Styles.mainTxt}>Time Management</div>
                    <span className={Styles.secTxt}>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et
                      dolore.
                    </span>
                    <div className={Styles.readTxt}>
                      <span>Read More</span>
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6 mb-4">
              <div>
                <div className="d-flex align-items-center">
                  <div className={`${Styles.iconSt2}`}>
                    <SVG src={icon2} />
                  </div>
                  <div className="d-flex flex-column">
                    <div className={Styles.mainTxt}>Search Analytics </div>
                    <span className={Styles.secTxt}>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et
                      dolore.
                    </span>
                    <div className={Styles.readTxt}>
                      <span>Read More</span>
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6 mb-4">
              <div>
                <div className="d-flex align-items-center">
                  <div className={`${Styles.iconSt2}`}>
                    <SVG src={icon3} />
                  </div>
                  <div className="d-flex flex-column">
                    <div className={Styles.mainTxt}>Right Analysis</div>
                    <span className={Styles.secTxt}>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et
                      dolore.
                    </span>
                    <div className={Styles.readTxt}>
                      <span>Read More</span>
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
