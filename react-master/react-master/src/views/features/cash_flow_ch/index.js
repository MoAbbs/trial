import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Charts from "./components";
import Request from "requests/Request";
import { DataSource } from "./helpers/dataSource";
import Spinner from "components/Loader/Spinenr";
import Filter from "./components/Filter/index";
import CategoriesBar from "views/CategoriesBar";
import SVG from "react-inlinesvg";
import icon7 from "/images/svg/cash-flow.svg";
import Styles from "./style.module.css";
import { mainQuery, transformData } from "helpers/requests";
import Note from 'components/note'
import { clone } from "lodash";

class CompanyView extends Component {
  state = {
    schedule: null,
    settings_schedule: {},
    settings__items: {},
    settings__item_category: {},
    product__company_items: {},
    product__company_item_values: {},
    product__company_item_check: {},
    loading: true,
  };
  componentDidMount() {
    let data = mainQuery(this.props.match?.params?.company);
    Request.sendRequest("multi_query/", data).then((res) => {
      res.data.settings_schedule = {
        ...this.props.schedule,
      };
      const result = transformData(res.data);
      this.setState({
        ...this.state,
        main_schedule: clone(result.settings_schedule.year),
        ...result,
        loading: false,
      });
    });
  }

  handelSaveFilter = (item) => {
    this.setState({
      schedule: item,
    });
  };

  render() {
    const {
      settings_schedule,
      loading,
      filter,
      settings__items,
      product__notes,
      settings__item_category,
      product__company_items,
      product__company_item_values,
      product__company_item_check,
      schedule,
    } = this.state;
    // const items = pickBy(settings__items, (d) => d.cs);

    const data = DataSource(
      schedule,
      settings__items,
      product__company_items,
      product__company_item_values,
      product__company_item_check,
      this,
      settings__items
    );
    return (
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="m-4 d-flex">
              <div className={`${Styles.iconSt}`}>
                <SVG src={icon7} />
              </div>
              <span className=" fw-bolder h5 p-2 text-primary">Cash Flow</span>
            </div>
            <CategoriesBar />
            <div className="d-flex justify-content-end w-100">
              <Note model="cash_flow" product__notes={product__notes} />
              <Filter
                type={filter?.type}
                schedule={settings_schedule}
                item={schedule}
                check={product__company_item_check}
                handleSubmit={this.handelSaveFilter}
              />
            </div>
            <Charts data={data} />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    schedule: state?.user?.schedule,
  };
};
export default connect(mapStateToProps, null)(withRouter(CompanyView));
