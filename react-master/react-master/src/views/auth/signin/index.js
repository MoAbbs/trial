import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import img1 from "../../../images/signin.jpg";
import logo from "../../../images/logo.png";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import Styles from "./style.module.css";
import Request from "../../../requests/Request";
import { withTranslation } from "react-i18next";
import { setVal } from "../../../store/action";
import { map, set } from "lodash";

class SignIn extends Component {
  state = {
    error: "",
  };
  render() {
    const { error } = this.state;
    const { t, _setVal } = this.props;
    return (
      <Fragment>
        <div className={Styles.secBackG}>
          <img src={logo} alt="img1" className={Styles.logoSt} />
          <div className={Styles.secCenter}>
            <div className={`${Styles.logInBg} DFLEX`}>
              <div className="w-75 m-auto">
                <div className="text-center mb-4">
                  <h4 className={Styles.headTxt}>Log In</h4>
                  <div className={Styles.secTxt}>
                    <span>Don't have an account?</span>&nbsp;
                    <Link to="/dashboard/signup">Sign up</Link>
                  </div>
                </div>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={yup.object().shape({
                    email: yup.string().required().email(),
                    password: yup
                      .string()
                      .required("Please Enter your password"),
                  })}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(async () => {
                      const data = {
                        username: values?.email,
                        password: values?.password,
                      };
                      Request.sendRequest("auth/", data)
                        .then((res) => {
                          const fetchData = {
                            settings__schedule: {},
                          };
                          Request.sendRequest("multi_query/", fetchData).then(
                            (fetchRes) => {
                              const schedule = {};
                              map(fetchRes?.data?.settings__schedule, (d) =>
                                set(schedule, `${d.type}.${d.id}`, d)
                              );
                              _setVal("SETVALUE", {
                                user: res?.data?.user,
                                schedule: schedule,
                                _token: res?.data?.token,
                              });
                            }
                          );
                        })
                        .catch((err) => {
                          this.setState({
                            error: t(`${err?.response?.data?.msg}`),
                          });
                        });
                      // this.props.history.push("/login");
                    }, 400);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="mb-3">
                        {error && (
                          <div className="alert alert-danger">{error}</div>
                        )}
                        <label className={`${Styles.labelSt} form-label`}>
                          Email Address
                        </label>
                        <Field
                          type="email"
                          name="email"
                          className={Styles.inputSt}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="mb-3">
                        <label className={`${Styles.labelSt} form-label`}>
                          Enter Password
                        </label>
                        <Field
                          type="password"
                          name="password"
                          className={Styles.inputSt}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting && !error}
                        className={`${Styles.btnSt} btn`}
                      >
                        Start Managing
                      </button>
                    </Form>
                  )}
                </Formik>
                <div className={Styles.termsPolicy}>
                  By Joining. You Agree To The{" "}
                  <span className={Styles.underLine}>Terms</span> And{" "}
                  <span className={Styles.underLine}>Privacy Policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    _setVal: (type, value) => {
      dispatch(setVal(type, value));
    },
  };
};
export default connect(null, mapDispatchToProps)(withTranslation()(SignIn));
