import { get, map, set } from "lodash";
import React, { useState } from "react";
import Modal from "components/Modal/main";
import Styles from "./style.module.css";

export default function Filter({
  type,
  schedule,
  handelChangeInput,
  handleSubmit,
}) {
  const [state, setState] = useState({
    show: false,
    type: type,
    selected: "year",
  });
  const filterSchedule = get(schedule, state?.type);
  const _schedule = {};
  map(filterSchedule, (d) => set(_schedule, `${d.parent}.${d.id}`, d));
  return (
    <div>
      <button
        className={`${Styles.mainBtn} btn`}
        onClick={() => {
          setState({ ...state, show: true });
        }}
      >
        Filter By
      </button>
      <Modal
        show={state?.show}
        handleClose={() => {
          setState({ ...state, show: false });
        }}
        title="Filter"
        save="Filter"
        closeBtn="close"
        handleSubmit={() => {
          handleSubmit(state?.type);
        }}
      >
        <div className="d-flex align-items-center">
          <label className={`${Styles.typeTxt} w-25`}>Type : </label>
          <select
            className={`${Styles.selectInput} w-75`}
            value={state?.type}
            onChange={(e) => {
              setState({ ...state, type: e.target.value });
            }}
          >
            <option value="year">Year</option>
            <option value="head">Head</option>
            <option value="quarter">Quarter</option>
            <option value="month">Month</option>
          </select>
        </div>
        <div>
          <div className="row">
            {map(_schedule, (item, key) => {
              return (
                <div
                  className={
                    state.selected === "year" ? Styles.yearSt : Styles.yearSt
                  }
                  key={key}
                >
                  <div className={Styles.parent}>{key}</div>
                  <div className="d-flex flex-wrap">
                    {map(item, (sub) => {
                      return (
                        <div
                          className={Styles.parentSub}
                          onClick={() => {
                            handelChangeInput(state?.type, sub?.id);
                          }}
                        >
                          <input
                            type="radio"
                            className="me-1"
                            checked={sub?.filtered === 1 ? 0 : 1}
                          />{" "}
                          {sub?.value}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
}
