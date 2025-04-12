import React, { Fragment, useState } from "react";

import SVG from "react-inlinesvg";
import icon from "../../../../../images/Group 3713.svg";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Styles from "./style.module.css";
import Steps from "../Steps";

const validationSchema = yup.object({
  name: yup.string().required("Company name is required"),
  registry_number: yup.string().required("Registry number is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  industries: yup.string().required("Industries is required"),
  financial_end: yup.string().required("Financial year-end is required"),
  currency: yup.string().required("Currency is required"),
  start_date: yup.string().required("Start date is required"),
  tax_rate: yup.string().required("Tax rate is required"),
});

export const AddCompany = ({ formData, setFormData, nextStep, prevStep }) => {
  const [direction, setDirection] = useState("back");
  return (
    <Fragment>
      <div className={Styles.secBackG}>
        <div className={Styles.secCenter}>
          <div className={`${Styles.logInBg} DFLEX`}>
            <div className={`${Styles.secPadd} w-75 m-auto position-relative`}>
              <div className="text-center mb-4">
                <h4 className={Styles.headTxt}>Add Company Info</h4>
                <div className={Styles.secTxt}>
                  <span>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore{" "}
                  </span>
                </div>
              </div>

              <Formik
                initialValues={formData?.Product__company}
                onSubmit={(values) => {
                  const data = {
                    ...formData,
                    Product__company: values,
                  };
                  setFormData(data);
                  direction === "back" ? prevStep() : nextStep();
                }}
                validationSchema={validationSchema}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-1">
                          <label className={`${Styles.labelSt} form-label`}>
                            Company Name
                          </label>
                          <Field
                            type="text"
                            name="name"
                            className={Styles.inputSt}
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className={`${Styles.errorSt} `}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-1">
                          <label className={`${Styles.labelSt} form-label`}>
                            Registry Number
                          </label>
                          <Field
                            type="text"
                            name="registry_number"
                            className={Styles.inputSt}
                          />
                          <ErrorMessage
                            name="registry_number"
                            component="div"
                            className={`${Styles.errorSt} `}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-1">
                          <label className={`${Styles.labelSt} form-label`}>
                            Country
                          </label>
                          <Field
                            type="text"
                            name="country"
                            className={Styles.inputSt}
                          />
                          <ErrorMessage
                            name="country"
                            component="div"
                            className={`${Styles.errorSt} `}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-1">
                          <label className={`${Styles.labelSt} form-label`}>
                            City
                          </label>
                          <Field
                            type="text"
                            name="city"
                            className={Styles.inputSt}
                          />
                          <ErrorMessage
                            name="city"
                            component="div"
                            className={`${Styles.errorSt} `}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-1">
                          <label className={`${Styles.labelSt} form-label`}>
                            Industries
                          </label>
                          <Field
                            type="text"
                            name="industries"
                            className={Styles.inputSt}
                          />
                          <ErrorMessage
                            name="industries"
                            component="div"
                            className={`${Styles.errorSt} `}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-1">
                          <label className={`${Styles.labelSt} form-label`}>
                            Financial year-end
                          </label>
                          <Field
                            type="text"
                            name="financial_end"
                            className={Styles.inputSt}
                          />
                          <ErrorMessage
                            name="financial_end"
                            component="div"
                            className={`${Styles.errorSt} `}
                          />
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div className="mb-2">
                          <label className={`${Styles.labelSt} form-label`}>
                            Currency
                          </label>
                          <Field
                            type="text"
                            name="currency"
                            className={Styles.inputSt}
                          />
                          <ErrorMessage
                            name="currency"
                            component="div"
                            className={`${Styles.errorSt} `}
                          />
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div className="mb-2">
                          <label className={`${Styles.labelSt} form-label`}>
                            Start Date
                          </label>
                          <Field
                            type="date"
                            name="start_date"
                            className={Styles.inputSt}
                          />
                          <ErrorMessage
                            name="start_date"
                            component="div"
                            className={`${Styles.errorSt} `}
                          />
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div className="mb-2">
                          <label className={`${Styles.labelSt} form-label`}>
                            Corporate tax rate
                          </label>
                          <Field
                            type="text"
                            name="tax_rate"
                            className={Styles.inputSt}
                          />
                          <ErrorMessage
                            name="tax_rate"
                            component="div"
                            className={`${Styles.errorSt} `}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      variant="contained"
                      onClick={() => setDirection("back")}
                      className={Styles.backBtn}
                    >
                      <div className={Styles.rotateSvg}>
                        <SVG src={icon} title="back" />
                      </div>
                    </button>
                    <div className="w-75 text-center m-auto">
                      <button
                        type="submit"
                        variant="contained"
                        className={`${Styles.btnSt} btn `}
                        onClick={() => setDirection("forward")}
                      >
                        Continue
                      </button>
                      <Steps addCompany="addcompany" />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AddCompany.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
};
