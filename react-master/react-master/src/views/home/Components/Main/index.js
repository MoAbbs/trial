import React, { Component, Fragment } from "react";
import MainNavbar from "../MainNavbar";
import Styles from "./style.module.css";
import {Link} from "react-router-dom";

export default class Main extends Component {
  render() {
    return (
      <Fragment>
        <div className={Styles.mianBgSt}>
          <MainNavbar />
          <div className={`${Styles.secWidth}`}>
            <div className={Styles.headSec}>
              <div className={Styles.emptyHalf}></div>
              <div className={Styles.mainHalf}>
                <span className={Styles.smheadTxt}>
                  We’re your Finance Consultant
                </span>
                <div className="d-flex align-items-center">
                  <div className={Styles.heightDiv}></div>
                  <span className={Styles.headTxt}>
                    Help you to <br /> Manage your finances
                  </span>
                </div>
                <span className={Styles.secTxt}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua.
                </span>
                <div className="d-flex">
                  <Link to="/dashboard" className={`${Styles.firstBtn} btn`}>
                    Get Started Now
                  </Link>
                  <button className={`${Styles.SecBtn} btn`}>
                    <i className="fas fa-play"></i> &nbsp;Watch Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
