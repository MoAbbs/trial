import { get, map, without } from "lodash";
import React from "react";
import Styles from "./style.module.css";

export const Columns = (schedule, filter) => {
  const columns = get(schedule, filter?.type);
  let res = map(columns, (column) => {
    if (!(column?.filtered === 1)) {
      return {
        title: (
          <div className={Styles.columnStyle}>
            <span>{column?.value}</span>
            {column?.parent && <div>{column?.parent}</div>}{" "}
          </div>
        ),
        dataIndex: column?.id,
        editable: true,
      };
    }
  });
  res = without(res, undefined);
  return [
    {
      title: "",
      dataIndex: "item",
      width: "270px",
      fixed: true,
    },
    ...res,
    // {
    //   title: 'operation',
    //   dataIndex: 'operation',
    //   render: (_, record) =>
    //     this.state.dataSource.length >= 1 ? (
    //       <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
    //         <a>Delete</a>
    //       </Popconfirm>
    //     ) : null,
    // },
  ];
};
