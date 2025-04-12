import { map } from "lodash";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import img1 from "../../images/logo.png";
import Request from "../../requests/Request";
import Spinner from "components/Loader/Spinenr";
import swal from 'sweetalert';
import Styles from "./style.module.css";
import { withTranslation } from "react-i18next";

class Company extends Component {
  state = {
    companies: null,
    loading: true
  }

  handelAddCompany = () => {
    const { t } = this.props
    if (this.props.user?.plan == 2) {

    } else {
      swal(t("Not Allowed!"), t("your package plan doesn't have this feature"), "error")
    }
  }
  componentDidMount() {
    const data = {
      Product__company: {
        filter: {
          user: this.props?.user?.id
        }
      }
    }
    Request.sendRequest("multi_query/", data)
      .then(res => {
        this.setState({
          companies: res.data?.product__company,
          loading: false
        })
      })
  }
  render() {
    const { companies, loading } = this.state
    return (
      <Fragment>
        {/* <Navbar /> */}
        <div className="container mt-5">
          {loading ?
            <Spinner />
            : <div className="row">
              {map(companies, (company, key) => {
                return (
                  <div key={key} className="col-lg-4 col-sm-6 mb-4">
                    <Link to={`/dashboard/company/${company?.id}`}>
                      <div className={Styles.divSty}>
                        <img src={company?.profile ? company?.profile : img1} alt="company" />
                        <span>{company?.name}</span>
                        <div>
                          {company?.industries}
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
              <div className="col-lg-4  col-sm-6 mb-4">
                <div
                  onClick={this.handelAddCompany}
                >
                  <div className={Styles.divSty}>
                    <i className="fas fa-plus-circle"></i>
                    <span>Add Company</span>
                    <div>Add Company Description</div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </Fragment>
    );
  }
}

export default withTranslation()(Company)
