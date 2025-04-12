import React, { Component, Fragment } from "react";
import logo from "../../../../images/logo.png";
import Styles from "./style.module.css";

export default class Footer extends Component {
  render() {
    return (
      <Fragment>
        <div className={Styles.footerSt}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-3 col-sm-6">
                <div>
                  <img src={logo} alt="img1" className={Styles.logoSt} />
                  <div className={Styles.lineTxt}>
                    Are you looking for professional advice for your new
                    business. Are you looking for professional advice for your
                    new business.
                  </div>
                  <div className={Styles.iconsSt}>
                    <i className="fab fa-facebook-square"></i>
                    <i className="fab fa-linkedin"></i>
                    <i className="fab fa-twitter-square"></i>
                    <i className="fab fa-youtube-square"></i>
                    <i className="fab fa-instagram-square"></i>
                    <i className="fab fa-google-plus-square"></i>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 pe-5">
                <div className="d-flex flex-column">
                  <div className={Styles.headTxt}>Services Link</div>
                  <span className={Styles.blueTxt}>Business</span>
                  <span className={Styles.blueTxt}>Agency</span>
                  <span className={Styles.blueTxt}>Social media</span>
                  <span className={Styles.blueTxt}>Branding</span>
                  <span className={Styles.blueTxt}>Design</span>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6">
                <div className="d-flex flex-column">
                  <div className={Styles.headTxt}>Information</div>
                  <p className={Styles.secTxt}>Tel : +0890-564-5644</p>
                  <p className={Styles.secTxt}>Email : info@lopard3.com</p>
                  <p className={Styles.secTxt}>
                    Location : House- 65/4, London
                  </p>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6">
                <div className="d-flex flex-column">
                  <div className={Styles.getStart}>Ready to Get Started?</div>
                  <span className={Styles.lineTxt}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore{" "}
                  </span>
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
                  <button className={`${Styles.btnSt} btn btn-block`}>
                    Call me back
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
