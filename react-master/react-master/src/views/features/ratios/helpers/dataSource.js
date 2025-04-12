import { round, flattenDeep, get, map, set, toArray, without, pickBy, size } from "lodash";
import React from "react";
import serializer from "requests/serializer";
import Styles from "../style.module.css";
import { Menu, Dropdown, Button } from "antd";
import InfoModal from "components/Modal/info";
var Parser = require("expr-eval").Parser;
var parser = new Parser();

export const DataSource = (
  compare,
  schedule,
  filter,
  items,
  data,
  values,
  cehck,
  _this,
  all_items,
) => {
  values = serializer({ product__company_item_values: values }, [
    {
      key: "product__company_item_values",
      index: ["item", "schedule"],
      type: "groupBy",
    },
  ])?.product__company_item_values;
  const columns = size(compare) > 0 ? compare : schedule;
  let cellValue = null;
  const orderedData = {};
  let scheduleData = {};
  const ds = flattenDeep(map(values, (d) => toArray(d)));
  console.log("values", ds);
  map(ds, (d, key) => {
    if (d.item) {
      const item = get(all_items, d.item);
      if (item) {
        set(scheduleData, `${d.schedule}.${item.order}`, d);
      }
    }
  });

  let prev = null;
  map(pickBy(all_items, d => d.exp), item => {
    map(columns, column => {
      parser.functions.val = (d) => get(d, "value", 0);
      // console.log("row.expressions", rowItem?.exp);
      var expr = parser.parse(item?.exp);
      const columnVals = get(scheduleData, column.id);
      var calc = 0;
      const pre_she = get(scheduleData, prev);
      if (columnVals) {
        calc = round(
          expr.evaluate({ x: columnVals, o: pre_she || {} }),
          2
        );
        set(scheduleData, `${column.id}.${item.order}`, { value: calc })
      }
      prev = column.id;
    })

  })
  prev = null
  map(data, (d) => set(orderedData, `${d.order}`, d));
  let res = map(orderedData, (row) => {
    let rowItem = get(items, row?.item);
    if (rowItem?.name && !row?.deleted_at) {
      let columnsData = {};
      map(columns, (column) => {
        let calculatedValue = null;
        if (rowItem?.exp) {
          // console.log("row.expressions", rowItem?.exp);
          calculatedValue = get(scheduleData, `${column.id}.${rowItem.order}.value`);
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
              {rowItem?.calculated ? calculatedValue : cellValue?.value}
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
        </Menu>
      );
      return {
        item: (
          <div
            row_id={row?.item}
            className={` ${rowItem?.calculated ? Styles.calculatedItem : Styles.notCalculated
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
                  <i class="fas fa-cog"></i>{" "}
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
  res = without(res, undefined);
  return [
    ...res,
  ];
};
