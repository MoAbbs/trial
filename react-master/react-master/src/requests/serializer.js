import { get, groupBy, map, reduce, set } from "lodash";

export default function serializer(data, filters) {
  let item
  let serialize;
  map(filters, (filter) => {
    item = get(data, filter.key)
    if (filter?.type === "groupBy") {
      serialize = reduce(item, (r, o) => {
        filter?.index
          .reduce((group, key, i, { length }) =>
            group[o[key]] = group[o[key]] || (i + 1 === length ? [] : {}), r)
          .push(o);
        return r;
      }, {});
    } else {
      serialize = reduce(item, (result, value, key) => {
        let index = get(value, filter.index)
        result[`${index}`] = value
        return result;
      }, {})
    }
    set(data, filter.key, serialize)
  })
  return data;
}