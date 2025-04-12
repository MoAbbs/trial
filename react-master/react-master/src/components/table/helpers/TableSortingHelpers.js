/* Pagination Helprs */
import React from "react";
import Styles from "../style.module.css";

export const sortCaret = (order, column) => {
  if (!order)
    return (
      <span className="svg-icon svg-icon-sm svg-icon-primary ml-1 svg-icon-sort">
        <i className={`${Styles.arrowSt} fas fa-arrow-up`}></i>
      </span>
    );
  else if (order === "asc")
    return (
      <span className="svg-icon svg-icon-sm svg-icon-primary ml-1">
        <i className={`${Styles.arrowSt} fas fa-arrow-up`}></i>
      </span>
    );
  else if (order === "desc")
    return (
      <span className="svg-icon svg-icon-sm svg-icon-primary ml-1">
        <i className={`${Styles.arrowSt} fas fa-arrow-down`}></i>
      </span>
    );
  return null;
};

export const headerSortingClasses = (
  column,
  sortOrder,
  isLastSorting,
  colIndex
) => (sortOrder === "asc" || sortOrder === "desc" ? "sortable-active" : "");
