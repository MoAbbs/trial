import { get } from "lodash";
import React, { Fragment, Component } from "react";
import { withTranslation } from "react-i18next";
import img1 from "../../../../images/home/Chart 1.png";
import Styles from "./style.module.css";

class Questions extends Component {
  state = {
    showInfo1: false,
    showInfo2: false,
    showInfo3: false,
  };

  handelChangeInfo = (type) => {
    this.setState({
      ...this.state,
      [type]: !get(this.state, type),
    });
  };

  render() {
    let { showInfo1, showInfo2, showInfo3 } = this.state;
    let { t } = this.props;

    return (
      <Fragment>
        <div className={Styles.secBg}>
          <div className="container">
            <div className="row align-items-center mt-5">
              <div className="col-lg-6">
                <div>
                  <span className={Styles.studSt}>MAIN PRINCIPLES</span>
                  <span className={`${Styles.headTxt} d-block`}>
                    Global Reach With Local Understanding
                  </span>

                  <div>
                    <header
                      className={`${Styles.quetionHead} ${
                        showInfo1 ? Styles.HeadColor1 : Styles.HeadColor2
                      }`}
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                      onClick={() => {
                        this.handelChangeInfo("showInfo1");
                      }}
                    >
                      <span className={Styles.questFont}>
                        In what areas do you provide Management consulting?
                      </span>
                      <div className="btn">
                        {showInfo1 ? (
                          <i
                            className={`${
                              showInfo1 ? Styles.arrowIcon1 : Styles.arrowIcon2
                            } fas fa-long-arrow-alt-down`}
                          ></i>
                        ) : (
                          <i
                            className={`fas ${
                              showInfo1 ? Styles.arrowIcon1 : Styles.arrowIcon2
                            } ${
                              t("app_lang") === "en"
                                ? "fas fa-long-arrow-alt-left"
                                : "fas fa-long-arrow-alt-right"
                            }`}
                          ></i>
                        )}
                      </div>
                    </header>
                    <div className="collapse" id="collapseExample">
                      <div className={Styles.reviewSt}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua.
                      </div>
                    </div>
                  </div>

                  <div>
                    <header
                      className={`${Styles.quetionHead} ${
                        showInfo2 ? Styles.HeadColor1 : Styles.HeadColor2
                      }`}
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample2"
                      aria-expanded="false"
                      aria-controls="collapseExample2"
                      onClick={() => {
                        this.handelChangeInfo("showInfo2");
                      }}
                    >
                      <span className={Styles.questFont}>
                        In which Countries do you provide consulting services?
                      </span>
                      <div className="btn">
                        {showInfo2 ? (
                          <i
                            className={`${Styles.arrowIcon1} fas fa-long-arrow-alt-down`}
                          ></i>
                        ) : (
                          <i
                            className={`fas ${Styles.arrowIcon2} ${
                              t("app_lang") === "en"
                                ? "fas fa-long-arrow-alt-left"
                                : "fas fa-long-arrow-alt-right"
                            }`}
                          ></i>
                        )}
                      </div>
                    </header>
                    <div className="collapse" id="collapseExample2">
                      <div className={Styles.reviewSt}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua.
                      </div>
                    </div>
                  </div>
                  <div>
                    <header
                      className={`${Styles.quetionHead} ${
                        showInfo3 ? Styles.HeadColor1 : Styles.HeadColor2
                      }`}
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample3"
                      aria-expanded="false"
                      aria-controls="collapseExample3"
                      onClick={() => {
                        this.handelChangeInfo("showInfo3");
                      }}
                    >
                      <span className={Styles.questFont}>
                        How is a consulting project started and organized?
                      </span>
                      <div className="btn">
                        {showInfo3 ? (
                          <i
                            className={`${
                              showInfo3 ? Styles.arrowIcon1 : Styles.arrowIcon2
                            } fas fa-long-arrow-alt-down`}
                          ></i>
                        ) : (
                          <i
                            className={`fas ${
                              showInfo3 ? Styles.arrowIcon1 : Styles.arrowIcon2
                            } ${
                              t("app_lang") === "en"
                                ? "fas fa-long-arrow-alt-left"
                                : "fas fa-long-arrow-alt-right"
                            }`}
                          ></i>
                        )}
                      </div>
                    </header>
                    <div className="collapse" id="collapseExample3">
                      <div className={Styles.reviewSt}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <img src={img1} alt="first" className="w-100" />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default withTranslation()(Questions);
