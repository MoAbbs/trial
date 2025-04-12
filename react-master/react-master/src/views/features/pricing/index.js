import React, { Component, Fragment } from "react";
import SVG from "react-inlinesvg";
import icon1 from "images/svg/download.svg";
import icon3 from "images/svg/data-analysis.svg";
import { withTranslation } from "react-i18next";
import { withRouter, Link } from "react-router-dom";
import Styles from "./style.module.css";
import CategoriesBar from "../../CategoriesBar";

class Pricing extends Component {
  render() {
    const { match } = this.props;
    return (
      <Fragment>
        {/* <Navbar /> */}
        <div className="container mt-4">
          <div className="m-4 d-flex">
            <div className={`${Styles.iconSt1}`}>
              <SVG src={icon1} />
            </div>
            <span className=" fw-bolder h5 p-2 text-primary">
              Pricing Feature
            </span>
          </div>

          <CategoriesBar />
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <Link
                to={`/dashboard/company/${match?.params?.company}/pricing/method`}
                className={Styles.divSty}
              >
                <div className={`${Styles.iconSt}`}>
                  <SVG src={icon1} />
                </div>
                <div>
                  <span className={Styles.headTxt}>Make Pricing Method</span>
                  <div>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore{" "}
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <Link
                to={`/dashboard/company/${match?.params?.company}/pricing/profabilty`}
                className={Styles.divSty}
              >
                <div className={`${Styles.iconSt}`}>
                  <SVG src={icon3} />
                </div>
                <div>
                  <span className={Styles.headTxt}>Check Price Profabilty</span>
                  <div>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore{" "}
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <Link
                to={`/dashboard/company/${match?.params?.company}/pricing/sales`}
                className={Styles.divSty}
              >
                <div className={`${Styles.iconSt}`}>
                  <SVG src={icon3} />
                </div>
                <div>
                  <span className={Styles.headTxt}>Credit Sales</span>
                  <div>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore{" "}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withTranslation()(withRouter(Pricing));
