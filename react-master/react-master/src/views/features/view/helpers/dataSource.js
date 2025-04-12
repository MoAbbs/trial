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
  settings__item_category
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
      const item = get(items, d.item);
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
  let ress = {};
  let res = [];
  let checked = {}
  const o = map(orderedData, (row) => {
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
              {rowItem.check ? (calculatedValue >= 1 ? <i className={`${Styles.marginChecked} fa-solid fa-square-check success`}></i>:<i className={`${Styles.marginChecked} fa-regular fa-square`}></i>):'' }
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
      let out = {
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
      if(rowItem.check){
        out = {
          item: (<div
            row_id={row?.item}
            className={Styles.chechStyle}
          >
          {row?.nickName ? row?.nickName : rowItem?.name}
          </div>
          ),
          ...columnsData,
        };
      }
      ress[rowItem?.category] = ress[rowItem?.category] || [];
      if(rowItem.check){
        checked = out
      }else{
        ress[rowItem?.category].push(out)
      }
      return out;
    }
  });
  map(ress, (d, k)=>{
    const cat = get(settings__item_category, k, {})
    const out = {
      className: 'category',
      item: (
        <div
          key={k}
          row_id={cat.id}
          className="category"
        >
          {cat?.name}
        </div>
      ),
    };
    res.push(out)
    map(d, v=>{
      res.push(v);
    })
  })
  if(checked){
    res.push(checked)
  }
  res = without(res, undefined);
  return [
    ...res,
  ];
};
