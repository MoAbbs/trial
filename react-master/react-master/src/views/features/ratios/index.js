import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EditableTable from "components/table";
import Request from "requests/Request";
import { Columns } from "./helpers/columns";
import { DataSource } from "./helpers/dataSource";
// import serializer from "requests/serializer";
//import ItemsBar from "./components/items";
import { clone, get, map, pickBy, set } from "lodash";
import Spinner from "components/Loader/Spinenr";
import swal from "sweetalert";
import Filter from "components/table/comps/filter";
import Modal from "components/Modal/main";
import NickName from "components/table/comps/filter";
import CategoriesBar from "views/CategoriesBar";
import SVG from "react-inlinesvg";
import icon1 from "../../../images/svg/data-analysis.svg";
import Compare from "../../../components/table/comps/compare";
import Styles from "./style.module.css";
import Note from 'components/note'
import { mainQuery, transformData } from "helpers/requests";

class CompanyView extends Component {
  state = {
    filter: {
      type: "year",
    },
    settings_schedule: {},
    settings__items: {},
    settings__item_category: {},
    product__company_items: {},
    product__company_item_values: {},
    product__company_item_check: {},
    compare: {},
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
  handelSaveCompare = (rows) => {
    this.setState({
      ...this.state,
      compare: rows,
    });
  };
  handelSaveFilter = (rows) => {
    this.setState({
      main_schedule: rows,
      compare: {},
    });
  };

  render() {
    const {
      loading,
      filter,
      settings_schedule,
      main_schedule,
      product__notes,
      settings__items,
      compare,
      product__company_items,
      product__company_item_values,
      product__company_item_check,
      modal,
    } = this.state;
    const ratio_items = pickBy(settings__items, (d) => d.type == "ratio");

    const data = DataSource(
      compare,
      main_schedule,
      filter,
      ratio_items,
      product__company_items,
      product__company_item_values,
      product__company_item_check,
      this,
      settings__items
    );
    const columns = Columns(compare, main_schedule, filter);
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
                Ratios Feature
              </span>
            </div>
            <CategoriesBar />
            <div className="d-flex justify-content-end w-100">
              <Note model="ratios" product__notes={product__notes} />
              <Compare
                schedule={settings_schedule}
                check={product__company_item_check}
                handleSubmit={this.handelSaveCompare}
              />
              <Compare
                type={filter?.type}
                title="Filter by"
                init={main_schedule}
                schedule={settings_schedule}
                check={product__company_item_check}
                handleSubmit={this.handelSaveFilter}
              />
            </div>
            <EditableTable
              dataSource={data}
              columns={columns}
              HandleEdit={(item, value) => {
                // this.HandleEdit(item, value);
              }}
            />
            <Modal
              show={modal?.show}
              handleClose={() => {
                this.setState({ ...this.state, modal: { show: false } });
              }}
              title={`${modal?.item?.name} ${modal?.type}`}
            >
              {modal?.type === "nickname" && (
                <NickName
                  companyItems={modal?.companyItem}
                  item={modal?.item}
                  handelClose={() => {
                    this.setState({ ...this.state, modal: { show: false } });
                  }}
                  handelSubmit={(item) => {
                    // this.handelSubmitItem(item);
                  }}
                />
              )}
            </Modal>
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
