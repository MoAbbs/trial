import { get, map, size, without } from "lodash";
import React from "react";
import Styles from "./style.module.css";

export const Columns = (methods) => {
  return [
    {
      title: <div className={Styles.columnStyle}>Cost</div>,
      dataIndex: "cost",
      width: "270px",
      editable: true,
    },
    {
      title: <div className={Styles.columnStyle}>Number</div>,
      dataIndex: "number",
      width: "270px",
      editable: true,
    },
    {
      title: <div className={Styles.columnStyle}>Mask</div>,
      dataIndex: "mask",
      width: "270px",
      editable: true,
    },
    {
      title: <div className={Styles.columnStyle}>Price</div>,
      dataIndex: "price",
      width: "270px",
      editable: true,
    },
  ];
};
