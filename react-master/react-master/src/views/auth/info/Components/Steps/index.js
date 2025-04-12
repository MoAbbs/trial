import React, { Component, Fragment } from "react";
import Styles from "./style.module.css";

export default class Steps extends Component {
  render() {
    let { configure, addCompany } = this.props;
    return (
      <Fragment>
        <div className="my-2">
          <div className="row ">
            <div className="col-6 ">
              <div
                className={configure ? Styles.activeStep : Styles.unActiveStep}
              ></div>
            </div>
            <div className="col-6">
              <div
                className={addCompany ? Styles.activeStep : Styles.unActiveStep}
              ></div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
