import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EditableTable from "components/table";
import Request from "requests/Request";
import { Columns } from "./helpers/columns";
import { DataSource } from "./helpers/dataSource";
import ItemsBar from "components/table/comps/items";
import { find, get, set, filter as lFilter, pickBy, map, clone } from "lodash";
import Note from 'components/note'
import Spinner from "components/Loader/Spinenr";
import swal from "sweetalert";
import Filter from "components/table/comps/filter";
import Modal from "components/Modal/main";
import NickName from "components/table/comps/nickname";
import CategoriesBar from "views/CategoriesBar";
import SVG from "react-inlinesvg";
import icon1 from "../../../images/svg/download.svg";
// import bg from "../../images/svg/Ellipse 411.png";
import Styles from "./style.module.css";
import Compare from "../../../components/table/comps/compare";
import { mainQuery, transformData } from "helpers/requests";
class CompanyInput extends Component {
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
  handelToggleItem = (item) => {
    const { product__company_items } = this.state;
    // this.setState({ ...this.state, loading: true })
    const company = this.props.match?.params?.company;
    const it = get(this.state?.product__company_items, item?.id);
    let deleted = false;
    if (it) {
      deleted = !it.deleted;
    }
    const data = {
      data: {
        product__company_items: [
          {
            id: find(product__company_items, { company, item: item?.id })?.id,
            company,
            item: item?.id,
            order: item?.order,
            deleted_at: null,
            deleted,
          },
        ],
      },
    };
    Request.sendRequest("update_models/", data).then((res) => {
      const item = res?.data?.product__company_items[0];
      swal("Add Item!", "Successfully add item to company", "success");
      this.setState({
        ...this.state,
        product__company_items: {
          ...this.state.product__company_items,
          [item?.item]: item,
        },
        loading: false,
      });
    });
  };
  HandleEdit = (item, value) => {
    if (value) {
      // this.setState({ ...this.state, loading: true })
      const result = {
        id: item?._id,
        company: this.props.match?.params?.company,
        item: item?.row_id,
        schedule: item?.column_id,
        value: value,
      };
      const data = {
        data: {
          product__company_item_values: [result],
        },
      };
      this.setState({
        ...this.state,
        product__company_item_values: {
          ...this.state.product__company_item_values,
          [result?.id]: result,
        },
        loading: false,
      });
      Request.sendRequest("update_models/", data).then((res) => {
        // const item = res?.data?.product__company_item_values[0];
        // this.setState({
        //   ...this.state,
        //   product__company_item_values: {
        //     ...this.state.product__company_item_values,
        //     [item?.id]: item,
        //   },
        //   loading: false,
        // });
      });
    }
  };
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
  handelCheck = (id) => {
    swal({
      title: "Check Values!",
      text: "are you sure you want to cofirm check values",
      icon: "warning",
      buttons: ["cancel", "check"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // this.setState({ ...this.state, loading: true })
        const data = {
          data: {
            product__company_item_check: [
              {
                company: this.props.match?.params?.company,
                schedule: id,
              },
            ],
          },
        };
        Request.sendRequest("update_models/", data).then((res) => {
          const item = res?.data?.product__company_item_check[0];
          this.setState({
            ...this.state,
            product__company_item_check: {
              ...this.state.product__company_item_check,
              [item?.schedule]: item,
            },
            loading: false,
          });
        });
      }
    });
  };
  handelShowModal = (type, item, row) => {
    if (type === "nickname") {
      this.setState({
        ...this.state,
        modal: {
          show: true,
          type: type,
          item: item,
          companyItem: row,
        },
      });
    } else {
      swal({
        title: "Remove Item!",
        text: "are you sure you want to remove item from company?",
        icon: "warning",
        buttons: ["cancel", "remove"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          // this.setState({ ...this.state, loading: true })
          const data = {
            data: {
              Product__company_items: [
                {
                  id: row?.id,
                  deleted: true,
                },
              ],
            },
          };
          Request.sendRequest("update_models/", data).then((res) => {
            const item = res?.data?.Product__company_items[0];
            this.setState({
              ...this.state,
              product__company_items: {
                ...this.state.product__company_items,
                [item?.item]: item,
              },
              loading: false,
            });
            swal(
              "Remove Item!",
              "Successfully remove item from company",
              "success"
            );
          });
        }
      });
    }
  };
  handelSubmitItem = (item) => {
    // this.setState({
    //     loading: true,
    // }, () => {
    // setTimeout(() => {
    // console.log(item)
    this.setState({
      product__company_items: {
        ...this.state.product__company_items,
        [item?.item]: item,
      },
      loading: false,
      modal: {
        show: false,
      },
    });
    // }, 500)
    // })
  };

  render() {
    const {
      compare,
      loading,
      filter,
      settings_schedule,
      main_schedule,
      settings__items,
      settings__item_category,
      product__company_items,
      product__company_item_values,
      product__company_item_check,
      product__notes,
      modal,
    } = this.state;
    const items = pickBy(settings__items, (d) => {
      const cat = get(settings__item_category, d.category);
      if(['ci', 'cf'].includes(cat?.type)){
        return false
      }
      return d.type == "input"
    });

    const data = DataSource(
      compare,
      main_schedule,
      filter,
      items,
      product__company_items,
      product__company_item_values,
      product__company_item_check,
      this,
      settings__items,
      settings__item_category
    );
    const columns = Columns(compare, main_schedule, filter);
    // console.log(product__company_items, "Product__company_items");
    // console.log(columns, "settings_schedule")
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
                Input Feature
              </span>
            </div>

            <CategoriesBar />
            <div className="d-flex justify-content-end w-100">
              <Note model="input" product__notes={product__notes} />
              <Compare
                type={filter?.type}
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
              <ItemsBar
                companyItems={product__company_items}
                items={items}
                categories={settings__item_category}
                handelToggleItem={this.handelToggleItem}
              />
            </div>
            <EditableTable
              dataSource={data}
              columns={columns}
              HandleEdit={(item, value) => {
                this.HandleEdit(item, value);
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
                    this.handelSubmitItem(item);
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
export default connect(mapStateToProps, null)(withRouter(CompanyInput));
