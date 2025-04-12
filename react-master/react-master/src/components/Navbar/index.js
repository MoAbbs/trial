import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import icon1 from "../../images/Settings4.svg";
import icon2 from "../../images/Notifications1.svg";
import icon3 from "../../images/Other1.svg";
import img2 from "../../images/Qatar_National_Bank_Logo.svg@2x.png";

import profImg from "../../images/300_16.jpg";
import InlineSVG from "react-inlinesvg/esm";
import Styles from "./style.module.css";

export default class Navbar extends Component {
  handeSignOut = () => {
    this.props._setVal("SETVALUE", {
      user: null,
      schedule: null,
      _token: null
    })
  }
  render() {
    return (
      <Fragment>
        <nav
          className={`${Styles.navMar} navbar navbar-expand-md navbar-light bg-white`}
        >
          <div className="container">
            <Link to="/dashboard" className="navbar-brand">
              <img src={logo} alt="img1" className={Styles.logoSt} />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2">
                <li className="nav-item">
                  <input
                    className={Styles.searchSt}
                    type="text"
                    placeholder="Search..."
                  />
                </li>
              </ul>

              <ul className="list-unstyled mr-auto d-flex justify-content-between align-items-center">
                <li className={`${Styles.iconSt} nav-item`}>
                  <InlineSVG src={icon1} />
                </li>
                <li
                  className={`${Styles.iconSt} nav-item ml-2`}
                >
                  <InlineSVG src={icon3} />
                </li>
                <li className={`${Styles.iconSt} nav-item mx-2`}>
                  <InlineSVG src={icon2} />
                  <i className={`${Styles.greenDot1} fas fa-circle`}></i>
                </li>
                <li className={`${Styles.profImg} ${Styles.dropdownSt} nav-item `}>
                  <img src={profImg} alt="img1" />
                  <i className={`${Styles.greenDot2} fas fa-circle`}></i>
                  <div className={Styles.dropdownContent}>
                    <div className="col-12">
                      <div className={Styles.divSty}
                        onClick={this.handeSignOut}
                      >
                        <span>Signout</span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Fragment>
    );
  }
}
