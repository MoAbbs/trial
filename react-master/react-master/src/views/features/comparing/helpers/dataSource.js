import {
  flatten,
  flattenDeep,
  get,
  map,
  values,
  pick,
  set,
  toArray,
  without,
  round,
} from "lodash";
import React from "react";
import serializer from "requests/serializer";
import Styles from "../style.module.css";
import { Menu, Dropdown, Button } from "antd";
import InfoModal from "components/Modal/info";
var Parser = require("expr-eval").Parser;
var parser = new Parser();
parser.functions.val = (d) => get(d, "value", 0);

export const DataSource = (
  schedule,
  years,
  items,
  data,
  _values,
  cehck,
  _this
) => {
  _values = serializer({ product__company_item_values: _values }, [
    {
      key: "product__company_item_values",
      index: ["item", "schedule"],
      type: "groupBy",
    },
  ])?.product__company_item_values;
  let columns = pick(get(schedule, "year"), values(years));
  columns = {
    ...columns,
    historical: {
      id: "historical",
      exp: "poh",
    },
    budget: {
      id: "budget",
      exp: "boh",
    },
    progress: {
      id: "progress",
      exp: "pob",
    },
  };
  let cellValue = null;
  const orderedData = {};
  let scheduleData = {};
  const ds = flattenDeep(map(_values, (d) => toArray(d)));
  map(ds, (d, key) => {
    if (d.item) {
      const item = get(items, d.item);
      set(scheduleData, `${d.schedule}.${item.order}`, d);
    }
  });

  let prev = null;
  map(data, (d) => set(orderedData, `${d.order}`, d));
  let res = map(orderedData, (row) => {
    let rowItem = get(items, row?.item);
    if (rowItem?.name && !row?.deleted_at) {
      let columnsData = {};
      map(columns, (column) => {
        var calculatedValue = 0;
        if (column?.exp && column?.id &&  get(rowItem, column.exp)) {
          // progress of change here
          const exp = get(rowItem, column.exp);
          let expr = parser.parse(exp);
          const datas = { H: get(scheduleData, years?.historical, []), B: get(scheduleData, years?.budget, []), P: get(scheduleData, years?.progress, [])};
          console.log(datas)
          calculatedValue = round(
            expr.evaluate(datas),
            2
          );
        } else if (rowItem?.exp) {
          parser.functions.val = (d) => get(d, "value", 0);
          let expr = parser.parse(rowItem?.exp);
          const columnVals = get(scheduleData, column.id);
          calculatedValue = 0;
          const pre_she = get(schedule, prev);
          if (columnVals) {
            calculatedValue = round(expr.evaluate({
              x: columnVals,
              o: pre_she || {},
            }), 2);
            set(scheduleData, `${column.id}.${rowItem.order}`, { value: calculatedValue })
          }
        }
        cellValue = get(get(_values, row?.item), column?.id);
        if (cellValue) {
          cellValue = cellValue[0];
        }
        columnsData = {
          ...columnsData,
          [column?.id]: (
            <span
              _id={cellValue?.id}
              row_id={row?.item}
              column_id={column?.id}
              edit={false}
            >
              {column?.exp || rowItem?.calculated
                ? calculatedValue
                : cellValue?.value}
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
            className={` ${
              rowItem?.calculated ? Styles.calculatedItem : Styles.notCalculated
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
  return [...res];
};
