import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EditableTable from "components/table";
import Request from "../../../requests/Request";
import { Columns } from "./helpers/columns";
import { DataSource } from "./helpers/dataSource";
import Spinner from "components/Loader/Spinenr";
import Filter from "./components/filter";
import CategoriesBar from "../../CategoriesBar";
import icon1 from "../../../images/svg/data-analysis.svg";
import SVG from "react-inlinesvg";
import Styles from "./style.module.css";
import { clone, get, pickBy } from "lodash";
import Note from 'components/note';
import { mainQuery, transformData } from "helpers/requests";
class Comparing extends Component {
  state = {
    filter: {
      years: null,
    },
    settings_schedule: {},
    settings__items: {},
    settings__item_category: {},
    product__company_items: {},
    product__company_item_values: {},
    product__company_item_check: {},
    modal: {
      show: false,
      type: "",
      item: "",
      companyItem: "",
    },
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
  handelSaveFilter = (type) => {
    this.setState(
      {
        loading: true,
        filter: {
          years: type,
        },
      },
      () => {
        setTimeout(() => {
          this.setState({
            ...this.state,
            loading: false,
          });
        }, 500);
      }
    );
  };

  render() {
    const {
      loading,
      filter,
      settings_schedule,
      settings__items,
      product__notes,
      settings__item_category,
      product__company_items,
      product__company_item_values,
      product__company_item_check,
      modal,
    } = this.state;
    const items = pickBy(product__company_items, (d) =>
      get(settings__items, `${d.item}.poh`, false)
    );
    const data = DataSource(
      settings_schedule,
      filter?.years,
      settings__items,
      items,
      product__company_item_values,
      product__company_item_check,
      this
    );
    const columns = Columns(settings_schedule, filter?.years);
    return (
      <div className={Styles.container}>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="m-4 d-flex">
              <div className={`${Styles.iconSt}`}>
                <SVG src={icon1} />
              </div>
              <span className=" fw-bolder h5 p-2 text-primary">Comparing</span>
            </div>
            <CategoriesBar />
            <div className="d-flex justify-content-end w-100">
              <Note model="comparing" product__notes={product__notes} />
              <Filter
                type={"year"}
                years={filter?.years}
                schedule={settings_schedule}
                handleSubmit={this.handelSaveFilter}
              />
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
  };
};
export default connect(mapStateToProps, null)(withRouter(Comparing));
