import React, { Component, Fragment } from "react";
import Styles from "./style.module.css";

export default class Welcome extends Component {
  render() {
    return (
      <Fragment>
        <div className={`${Styles.secWidth} pb-5`}>
          <div className="row align-items-end">
            <div className="col-md-7">
              <div>
                <span className={Styles.studSt}>Welcome To Bznsi</span>
                <span className={`${Styles.headTxt} d-block`}>
                  We Will Provide Best Financial
                  <br /> Services For Your Business
                </span>
                <div className={Styles.lineAfter}></div>
                <span>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua.{" "}
                </span>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className={Styles.checkSec}>
                      <i className="fas fa-check"></i>
                      <span>Learn from customers feedback</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={Styles.checkSec}>
                      <i className="fas fa-check"></i>
                      <span>Learn from customers feedback</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={Styles.checkSec}>
                      <i className="fas fa-check"></i>
                      <span>Professional team</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={Styles.checkSec}>
                      <i className="fas fa-check"></i>
                      <span>Professional team</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={Styles.checkSec}>
                      <i className="fas fa-check"></i>
                      <span>High saving potential</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={Styles.checkSec}>
                      <i className="fas fa-check"></i>
                      <span>High saving potential</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className={Styles.rightDiv}>
                <span className={Styles.studSt}>Want To Know More</span>
                <span className={`${Styles.headTxt} d-block`}>
                  Request An Email
                </span>
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className={`${Styles.inputSt} form-control`}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className={`${Styles.inputSt} form-control`}
                  />
                  <textarea
                    rows="6"
                    className={`${Styles.textareaSt} form-control`}
                  >
                    Additional Details
                  </textarea>
                  <div className="text-center">
                    <button className={`${Styles.btnSt} btn`}>
                      Get a Quote
                    </button>
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
