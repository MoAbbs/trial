import React, { Fragment } from "react";
import CategoriesBar from "../../CategoriesBar";
import FirstSample from "./components/FirstSample";
import SecSample from "./components/SecSample";
import Styles from "./style.module.css";

export default function Graphss() {
  let finical = "finical";
  let revenue = "revenue";
  let ebitda = "ebitda";
  return (
    <Fragment>
      <div className={Styles.secWidth}>
        <div className="container-fluid">
          <CategoriesBar />
          <div className="text-end">
            <button className={`${Styles.mainBtn} btn`}>Edit default</button>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-4">
              <FirstSample />
            </div>
            <div className="col-lg-6 mb-4">
              <FirstSample finical={finical} />
            </div>
            <div className="col-lg-6 mb-4">
              <SecSample />
            </div>
            <div className="col-lg-6 mb-4">
              <SecSample ebitda={ebitda} />
            </div>
            <div className="col-lg-6 mb-4">
              <FirstSample revenue={revenue} />
            </div>
            <div className="col-lg-6 mb-4">
              <FirstSample />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
