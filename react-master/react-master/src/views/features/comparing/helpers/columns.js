import { get, map, without } from "lodash";
import React from "react";
import Styles from "../style.module.css";

export const Columns = (schedule, years) => {
  const columns = get(schedule, "year");
  let res = map(years, (column, key) => {
    const itemSchedule = get(columns, column);
    return {
      title: (
        <div className={Styles.columnStyle}>
          <span>{itemSchedule?.value}</span>
        </div>
      ),
      dataIndex: itemSchedule?.id,
      editable: false,
      width: "180px",
    };
  });
  res = [
    ...res,
    {
      title: (
        <div>
          <span></span>
        </div>
      ),
      className: Styles.none,
      dataIndex: "",
      editable: false,
    },
    {
      title: (
        <div className={Styles.columnStyle}>
          <span>precentage of historical</span>
        </div>
      ),
      dataIndex: "historical",
      editable: false,
      width: "200px",
    },
    {
      title: (
        <div className={Styles.columnStyle}>
          <span>precentage of budget</span>
        </div>
      ),
      dataIndex: "budget",
      editable: false,
      width: "200px",
    },
    {
      title: (
        <div className={Styles.columnStyle}>
          <span>precentage of progress</span>
        </div>
      ),
      dataIndex: "progress",
      editable: false,
      width: "200px",
    },
  ];
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
