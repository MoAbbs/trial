import React, { Component, Fragment } from "react";
import CategoriesBar from "../../CategoriesBar";
// import { SimpleBarChart1 } from "./components/negativeBar";
import { SimpleBarChart } from "./components/PostiveBar";
import Styles from "./style.module.css";

export default class CashFlow extends Component {
  render() {
    const data = [
      { name: "Page A", pv: 245667 },
      { name: "B", pv: 235667 },
      { name: "C", pv: 29767 },
      { name: "Page D", pv: 24667 },
      { name: "Zero", pv: 29667 },
      { name: "Hi", pv: 2407 },
      { name: "Bye", pv: 24577 },
      { name: "Page B", pv: -245667 },
      { name: "g", pv: -235667 },
      { name: "hh", pv: -29767 },
      { name: "Page w", pv: -24667 },
      { name: "fff", pv: -29667 },
      { name: "mm", pv: -2407 },
      { name: "ttt", pv: -24577 },
    ];
    // const data1 = [
    //   { name: "Page A", pv: -245667 },
    //   { name: "B", pv: -235667 },
    //   { name: "C", pv: -29767 },
    //   { name: "Page D", pv: -24667 },
    //   { name: "Zero", pv: -29667 },
    //   { name: "Hi", pv: -2407 },
    //   { name: "Bye", pv: -24577 },
    // ];
    return (
      <Fragment>
        <div className={Styles.secWidth}>
          <div className="container-fluid">
            <CategoriesBar />
            <div className="text-end">
              <button className={`${Styles.mainBtn} btn`}>View by</button>
            </div>
            <SimpleBarChart data={data} xKey="name" yKey="pv" />
            {/* <div className="text-center my-3">
              <button className={`${Styles.totalBtn} btn`}>
                <sup className={Styles.supSt}>Total Cash</sup> 12,890,00
              </button>
            </div> */}
            <div className="text-center my-3">
              <button className={`${Styles.totalBtn} btn`}>
                <sup className={Styles.supSt}>Total Cash out</sup> 12,890,00
              </button>
              <button className={`${Styles.totalBtn} btn`}>
                <sup className={Styles.supSt}>Total Cash in</sup> 12,890,00
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
