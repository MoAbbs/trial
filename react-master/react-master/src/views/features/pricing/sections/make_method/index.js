import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import EditableTable from "components/table";
import Request from "requests/Request";
import { Columns } from "./helpers/columns";
import { DataSource } from "./helpers/dataSource";
import { find, get, set, filter as lFilter, pickBy } from "lodash";
import Spinner from "components/Loader/Spinenr";
import SVG from "react-inlinesvg";
import icon1 from "images/svg/download.svg";
import { setVal } from "../../../../../store/action";
import Styles from "./style.module.css";

class PricingMethod extends Component {
  state = {
    loading: false,
  };
  HandleEdit = (item, value) => {
    const result = set(
      this.props.methods,
      `${item?.row_id}.${item?.column_id}`,
      value
    );
    console.log(item);
    this.props._setVal("SETVALUE", {
      methods: result,
    });
  };
  componentDidMount() {}
  render() {
    const { loading } = this.state;
    const { methods } = this.props;
    console.log(this.props);
    const data = DataSource(methods, this);
    const columns = Columns(methods);
    return (
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="m-4 d-flex">
              <div className={`${Styles.iconSt}`}>
                <SVG src={icon1} />
              </div>
              <span className=" fw-bolder h5 p-2 text-primary">
                Make Pricing Method
              </span>
            </div>
            <EditableTable
              dataSource={data}
              columns={columns}
              HandleEdit={(item, value) => {
                this.HandleEdit(item, value);
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    schedule: state?.user?.schedule,
    methods: state?.user?.methods,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    _setVal: (type, value) => {
      dispatch(setVal(type, value));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PricingMethod));
