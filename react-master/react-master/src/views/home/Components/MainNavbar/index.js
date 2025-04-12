import React, { Component, Fragment } from "react";
import logo from "../../../../images/logo.png";

import Styles from "./style.module.css";

export default class MainNavbar extends Component {
  render() {
    return (
      <Fragment>
        <nav
          className={`navbar ${Styles.bordBottom} navbar-expand-lg navbar-light`}
        >
          <div className="container">
            <div className={Styles.iconsSt}>
              <i className="fab fa-facebook-square"></i>
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-twitter-square"></i>
              <i className="fab fa-youtube-square"></i>
              <i className="fab fa-instagram-square"></i>
              <i className="fab fa-google-plus-square"></i>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className={`${Styles.collapseIcon} fas fa-expand-alt`}></i>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className={`${Styles.Dflex} ms-auto`}>
                <input
                  className={Styles.searchSt}
                  type="text"
                  placeholder="Search..."
                />
                <div className={Styles.heightDiv}></div>
                <div className={Styles.locAndMail}>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>10 In Location-Cairo-Egypt</span>
                </div>
                <div className={Styles.heightDiv}></div>
                <div className={Styles.locAndMail}>
                  <i className="fas fa-envelope"></i>
                  <span>Bznsi-workmail@email.com</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <div>
              <img src={logo} alt="img1" className={Styles.logoSt} />
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent1"
              aria-controls="navbarSupportedContent1"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className={`${Styles.collapseIcon} fas fa-expand-alt`}></i>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent1"
            >
              <div className={`${Styles.Dflex} ms-auto`}>
                <span className={Styles.links}>Home</span>
                <span className={Styles.links}>About us</span>
                <span className={Styles.links}>Services</span>
                <span className={Styles.links}>Be Partner</span>
                <span className={Styles.links}>Contact Us</span>
                <button className={`${Styles.requestBtn} btn`}>
                  Request A Trial
                </button>
              </div>
            </div>
          </div>
        </nav>
      </Fragment>
    );
  }
}
