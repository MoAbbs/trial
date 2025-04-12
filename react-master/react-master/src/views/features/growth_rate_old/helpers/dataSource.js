import { round, flattenDeep, get, map, set, toArray, without } from "lodash";
import React from "react";
import serializer from "requests/serializer";
import Styles from "../style.module.css";
import { Menu, Dropdown, Button } from "antd";
import InfoModal from "components/Modal/info";

var Parser = require("expr-eval").Parser;
var parser = new Parser();

export const DataSource = (
  schedule,
  filter,
  items,
  data,
  values,
  cehck,
  _this
) => {
  values = serializer({ product__company_item_values: values }, [
    {
      key: "product__company_item_values",
      index: ["item", "schedule"],
      type: "groupBy",
    },
  ])?.product__company_item_values;
  const columns = get(schedule, filter?.type);
  let cellValue = null;
  const orderedData = {};
  let scheduleData = {};
  const ds = flattenDeep(map(values, (d) => toArray(d)));
  // console.log("values", ds);
  map(ds, (d, key) => {
    if (d.item) {
      const item = get(items, d.item);
      if(item){
        set(scheduleData, `${d.schedule}.${item.order}`, d);
      }
    }
  });

  // console.log(scheduleData, "scheduleData")
  let prev = null;
  map(data, (d) => set(orderedData, `${d.order}`, d));
  let res = map(orderedData, (row) => {
    let rowItem = get(items, row?.item);
    if (rowItem?.name && !row?.deleted_at) {
      let columnsData = {};
      map(columns, (column) => {
        if (rowItem?.grate) {
          parser.functions.val = (d) => get(d, "value", 0);
          // console.log("row.grateressions", rowItem?.grate);
          var expr = parser.parse(rowItem?.grate);
          const columnVals = get(scheduleData, column.id);
          var calculatedValue = 0;
          const pre_she = get(scheduleData, prev);
          if (columnVals) {
            calculatedValue = round(
              expr.evaluate({ x: columnVals, o: pre_she || {} }),
              2
            );
          }
        }
        cellValue = get(get(values, row?.item), column?.id);
        if (cellValue) {
          cellValue = cellValue[0];
        }
        // console.log(values, "data klmlkn klneqwdata data");
        columnsData = {
          ...columnsData,
          [column?.id]: (
            <span
              _id={cellValue?.id}
              row_id={row?.item}
              column_id={column?.id}
              edit={false}
            >
              {rowItem?.grate ? calculatedValue : cellValue?.value}
            </span>
          ),
        };
        prev = column.id;
      });
      const menu = (
        <Menu>
          <Menu.Item>
            <InfoModal item={rowItem} />
          </Menu.Item>
          <Menu.Item>
            <span
              onClick={() => {
                _this.handelShowModal("nickname", rowItem, row);
              }}
            >
              set nickname
            </span>
          </Menu.Item>
          {!rowItem?.calculated && (
            <Menu.Item>
              <span
                onClick={() => {
                  _this.handelShowModal("remove", rowItem, row);
                }}
              >
                remove item
              </span>
            </Menu.Item>
          )}
        </Menu>
      );
      return {
        item: (
          <div
            row_id={row?.item}
            className={` ${
              rowItem?.grate ? Styles.calculatedItem : Styles.notCalculated
            }`}
          >
            <Dropdown
              overlay={menu}
              placement="bottomLeft"
              arrow
              className="m-2"
            >
              <Button>
                <span>
                  {" "}
                  <i className="fas fa-cog"></i>{" "}
                </span>
              </Button>
            </Dropdown>
            {row?.nickName ? row?.nickName : rowItem?.name}
          </div>
        ),
        ...columnsData,
      };
    }
  });
  let checkData = {};
  map(columns, (column) => {
    checkData = {
      ...checkData,
      [column?.id]: (
        <div
          column_id={column?.id}
          edit={"check"}
          className={Styles.checkContainer}
        >
          {get(cehck, column?.id) ? (
            <div className={Styles?.checkActive}></div>
          ) : (
            <div
              className={Styles?.checkUnActive}
              onClick={() => {
                _this.handelCheck(column?.id);
              }}
            ></div>
          )}
        </div>
      ),
    };
  });
  res = without(res, undefined);
  return [
    ...res,
    {
      item: (
        <div className={Styles.chechStyle}>
          <h5>Check</h5>
          <span>(Check values you are set)</span>
        </div>
      ),
      ...checkData,
    },
  ];
};
