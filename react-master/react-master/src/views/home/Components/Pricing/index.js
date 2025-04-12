import React, { Component, Fragment } from "react";
import Basic from "./Basic";
import Enterprise from "./Enterprise";
import Startup from "./Startup";
import Styles from "./style.module.css";
import "./__Style.css";
export default class Pricing extends Component {
  render() {
    return (
      <Fragment>
        <div className={Styles.backBgSt}>
          <div className={Styles.secWid}>
            <div className={Styles.SponBy}>Explore Pricing Plans</div>
            <div className={Styles.secHeadTxt}>Choose the Best Plan</div>
            <div className={Styles.secTxt}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua.
            </div>
            <div className="d-flex align-items-center justify-content-center my-4">
              <div className={Styles.switchTxt}>Billed Monthly</div>
              <div className="switch">
                <input
                  id="cmn-toggle-1"
                  className="cmn-toggle cmn-toggle-round"
                  type="checkbox"
                />
                <label htmlFor="cmn-toggle-1"></label>
              </div>
              <div className={Styles.switchTxt}>Billed Yearly</div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-4">
                <Basic />
              </div>
              <div className="col-lg-4 col-md-6 mb-4">
                <Startup />
              </div>
              <div className="col-lg-4 col-md-6 mb-4">
                <Enterprise />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
