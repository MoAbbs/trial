import React, { useEffect } from "react";
import img1 from "../../../../../images/pexels-olya-kobruseva-8962444.jpg";
import logo from "../../../../../images/logo.png";
import Styles from "./style.module.css";
import Spinner from "components/Loader/Spinenr";

export const Done = ({ formData, prevStep, submit }) => {

  useEffect(() => {
    const data = {
      data: {
        auth__user: [formData?.auth__user],
        Product__company: [formData?.Product__company]
      }
    }
    submit(data)

  }, [true])

  return (
    <div className="row align-items-center">
      <div className="col-md-6">
        <div className="position-relative">
          <img src={img1} alt="img1" className={Styles.imgSt} />
          <img src={logo} alt="img1" className={Styles.logoSt} />
        </div>
      </div>

      <div className="col-md-6">
        {formData?.loading ?
          <Spinner />
          : <div>
            <div className="alert alert-danger">{formData?.error}</div>
            <button className="btn btn-danger mx-auto"
              onClick={() => { prevStep() }}
            >Back</button>
          </div>

        }
      </div>
    </div>
  );
};
