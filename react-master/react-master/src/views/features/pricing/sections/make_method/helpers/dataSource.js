import { round, flattenDeep, get, map, set, toArray, without, pickBy, size } from "lodash";
import React from "react"
export const DataSource = (
    methods,
    _this,
) => {
    const mask = get(methods,"method_1")?.mask
    let res = map(methods, (method, key) => {
        console.log("method",method)
        return {
            cost:(<span
                row_id={key}
                column_id={"cost"}
                edit={true}
            >{method?.cost}</span>)
            ,number:(<span
                row_id={key}
                column_id={"number"}
                edit={true}
            >{method?.number}</span>)
            ,mask:(<span
                row_id={"method_1"}
                column_id={"mask"}
                edit={true}
            >{mask}</span>)
            ,price:(<span
                row_id={key}
                column_id={"price"}
                edit={true}
            >{method?.price}</span>)
        }
                }
            );

    res = without(res, undefined);
    return [
        ...res,
    ];
};