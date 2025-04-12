import React, { Component, Fragment } from "react";
import Styles from "../style.module.css";

export default class Enterprise extends Component {
  render() {
    return (
      <Fragment>
        <div className={Styles.priceSt}>
          <div className={`${Styles.priceHead} DFLEX`}>
            <span className={Styles.typeSt}>Enterprise</span>
            <div className="d-flex position-relative pe-4">
              <p>
                <sup className={Styles.dollar}>$</sup>{" "}
                <span className={Styles.priceNum}>89</span>
              </p>
              <div className={Styles.perMonth}>/Month</div>
            </div>
          </div>
          <div className="mt-3">
            <div className={`DFLEX ${Styles.checkSty}`}>
              <span>Support You Business </span>
              <i className="fas fa-check"></i>
            </div>
            <div className={`DFLEX ${Styles.checkSty}`}>
              <span>Rvoke Dokument Access </span>
              <i className="fas fa-check"></i>
            </div>
            <div className={`DFLEX ${Styles.checkSty}`}>
              <span>Detailed Risk Profilling </span>
              <i className="fas fa-check"></i>
            </div>
            <div className={`DFLEX ${Styles.checkSty}`}>
              <span>Enter Unlimited Bils </span>
              <i className="fas fa-check"></i>
            </div>
            <div className={`DFLEX ${Styles.checkSty1}`}>
              <span>Bank Transactions </span>
              <i className="fas fa-times"></i>
            </div>
            <div className={`DFLEX ${Styles.checkSty1}`}>
              <span>Financial Strategy </span>
              <i className="fas fa-times"></i>
            </div>
          </div>
          <div className="text-center mt-4">
            <button className={`${Styles.requestBtn} btn`}>Get Started</button>
          </div>
        </div>
      </Fragment>
    );
  }
}
