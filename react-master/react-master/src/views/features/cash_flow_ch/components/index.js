import { round, sumBy } from "lodash";
import React, { Component, Fragment } from "react";
import SimpleBarChart from "./PostiveBar";
import Styles from "./style.module.css";

export default class CashFlow extends Component {
  render() {
    const {data} = this.props;
    const cashOut = round(sumBy(data, d=>(Number(d.cashOut || 0))), 2)
    const cashIn = round(sumBy(data, d=>(Number(d.cashIn || 0))), 2)
    return (
      <Fragment>
        <SimpleBarChart data={data} />
        <div className="text-center my-3">
          <button className={`${Styles.totalBtn} btn`}>
            <sup className={Styles.supSt}>Change in cash out</sup> {cashOut}
          </button>
          <button className={`${Styles.totalBtn} btn`}>
            <sup className={Styles.supSt}>Change in cash in</sup> {cashIn}
          </button>
        </div>
      </Fragment>
    );
  }
}
