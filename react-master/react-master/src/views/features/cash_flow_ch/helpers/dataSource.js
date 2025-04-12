import {
  round,
  flattenDeep,
  get,
  map,
  set,
  toArray,
  without,
  pickBy,
  keys,
  filter,
  orderBy,
} from "lodash";
import serializer from "requests/serializer";
import "react-circular-progressbar/dist/styles.css";
var Parser = require("expr-eval").Parser;
var parser = new Parser();
export const DataSource = (
  schedule,
  items,
  data,
  values,
  cehck,
  _this,
  all_items
) => {
  const {settings__item_category, settings_schedule} = _this.state;
  values = serializer({ product__company_item_values: values }, [
    {
      key: "product__company_item_values",
      index: ["item", "schedule"],
      type: "groupBy",
    },
  ])?.product__company_item_values;

  const orderedData = {};
  let scheduleData = {};
  const ds = flattenDeep(map(values, (d) => toArray(d)));
  console.log("values", ds);
  map(ds, (d, key) => {
    if (d.item) {
      const item = get(items, d.item);
      if(item){
        set(scheduleData, `${d.schedule}.${item.order}`, d);
      }
    }
  });
  let prev = null;
  const columns = get(settings_schedule, 'year');
  map(pickBy(all_items, d=>d.exp), item=>{
    map(columns, column=>{
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
        set(scheduleData, `${column.id}.${item.order}`, {value: calc})
      }
      prev = column.id;
    })

  })
  const is = keys(schedule)?.[0];
  map(data, (d) => set(orderedData, `${d.order}`, d));
  let res = map(filter(orderedData, (row=>{
    let rowItem = get(items, row?.item);
    const cat = get(settings__item_category, rowItem.category, {});
    return cat.type == 'cf' && rowItem.incs?.includes('cfc')
  })), (row) => {
    let rowItem = get(items, row?.item);
    const val = get(get(scheduleData, is), row?.order);
    const cellValue = val?.value;

    return {
      item: rowItem.name,
      cat: rowItem.category,
      mainVal: cellValue,
      cashIn: Number(cellValue > 0 ? cellValue : 0),
      cashOut: Number(cellValue < 0 ? cellValue : 0),
    };
  }).filter((d) => d.mainVal != undefined);
  res = without(res, undefined);
  return orderBy(res, ['mainVal'], ['desc']);
};
