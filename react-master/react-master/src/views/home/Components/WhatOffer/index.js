import React, { Component, Fragment } from "react";
import icon1 from "../../../../images/home/wall-clock.svg";

import SVG from "react-inlinesvg";

import Styles from "./style.module.css";

export default class WhatOffer extends Component {
  render() {
    return (
      <Fragment>
        <div className="container my-5">
          <span className={Styles.tagsSt}>What We Offer</span>
          <div className="row my-4">
            <div className="col-lg-5">
              <div>
                <h4 className={Styles.mainTxt}>
                  Finance Planning and Consultancy That Empowers You
                </h4>
              </div>
            </div>
            <div className="col-lg-7">
              <div>
                <span className={Styles.spanTxt}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua.{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-6 mb-3">
              <div className={Styles.colStyle}>
                <div className={`${Styles.iconSt}`}>
                  <SVG src={icon1} />
                </div>
                <div className={Styles.headTxt}>Financial Services</div>
                <div className={Styles.smTxt}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua.{" "}
                </div>
              </div>
            </div>
            <div className="col-lg-3  col-sm-6 mb-3">
              <div className={Styles.colStyle1}>
                <div className={`${Styles.iconSt}`}>
                  <SVG src={icon1} />
                </div>
                <div className={Styles.headTxt1}>Planning</div>
                <div className={Styles.smTxt1}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua.{" "}
                </div>
              </div>
            </div>
            <div className="col-lg-3  col-sm-6 mb-3">
              <div className={Styles.colStyle}>
                <div className={`${Styles.iconSt}`}>
                  <SVG src={icon1} />
                </div>
                <div className={Styles.headTxt}>Planning</div>
                <div className={Styles.smTxt}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua.{" "}
                </div>
              </div>
            </div>
            <div className="col-lg-3  col-sm-6 mb-3">
              <div className={Styles.colStyle}>
                <div className={`${Styles.iconSt}`}>
                  <SVG src={icon1} />
                </div>
                <div className={Styles.headTxt}>Planning</div>
                <div className={Styles.smTxt}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
