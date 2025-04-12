import { get, map, set } from "lodash";
import React, { useState } from "react";
import Modal from "components/Modal/main";
import Styles from "./style.module.css";
import swal from "sweetalert";

export default function Filter({ type, schedule, years, handleSubmit }) {
  const [state, setState] = useState({
    show: false,
    type: type,
    selected: "year",
    years: {
      historical: null,
      budget: null,
      progress: null,
    },
  });
  const HandleSubmit = () => {
    const { historical, budget, progress } = state.years;
    if (historical && budget && progress) {
      handleSubmit(state.years);
      setState({ ...state, show: false });
    } else {
      swal(
        "missing data",
        "please choose year for historical , budget and progress",
        "warning"
      );
    }
  };
  const handelShow = () => {
    if (years?.historical && years?.budget && years?.progress) {
      setState({ ...state, show: !state?.show });
    }
  };
  const filterSchedule = get(schedule, state?.type);
  const _schedule = {};
  map(filterSchedule, (d) => set(_schedule, `${d.parent}.${d.id}`, d));
  console.log(
    years?.historical && years?.budget && years?.progress,
    state?.show
  );
  return (
    <div>
      <button className={`${Styles.mainBtn} btn`} onClick={handelShow}>
        Filter By
      </button>
      <Modal
        show={
          !(years?.historical && years?.budget && years?.progress) ||
          state?.show
            ? true
            : false
        }
        handleClose={handelShow}
        title="Filter"
        save="Filter"
        closeBtn=" "
        handleSubmit={() => {
          HandleSubmit(state?.type);
        }}
      >
        <div className="d-flex align-items-center  mb-1">
          <label className="w-25 fw-bolder">Historical year : </label>
          <select
            className={`${Styles.selectSt} form-control w-75`}
            value={state?.years?.historical}
            onChange={(e) => {
              setState({
                ...state,
                years: { ...state?.years, historical: e.target.value },
              });
            }}
          >
            <option>Choose year</option>
            {map(_schedule, (item, key) => {
              return map(item, (sub) => {
                return <option value={sub?.id}>{sub?.value}</option>;
              });
            })}
          </select>
        </div>
        <div className="d-flex align-items-center  mb-1">
          <label className="w-25 fw-bolder">Budget year : </label>
          <select
            className={`${Styles.selectSt} form-control w-75`}
            value={state?.years?.budget}
            onChange={(e) => {
              setState({
                ...state,
                years: { ...state?.years, budget: e.target.value },
              });
            }}
          >
            <option>Choose year</option>
            {map(_schedule, (item, key) => {
              return map(item, (sub) => {
                return <option value={sub?.id}>{sub?.value}</option>;
              });
            })}
          </select>
        </div>
        <div className="d-flex align-items-center">
          <label className="w-25 fw-bolder">Progress year : </label>
          <select
            className={`${Styles.selectSt} form-control w-75`}
            value={state?.years?.progress}
            onChange={(e) => {
              setState({
                ...state,
                years: { ...state?.years, progress: e.target.value },
              });
            }}
          >
            <option>Choose year</option>
            {map(_schedule, (item, key) => {
              return map(item, (sub) => {
                return <option value={sub?.id}>{sub?.value}</option>;
              });
            })}
          </select>
        </div>
      </Modal>
    </div>
  );
}
