import { get, map, omit, set } from "lodash";
import React, { useState } from "react";
import Modal from "components/Modal/main";
import Collapse from "react-bootstrap/Collapse";
import Styles from "./style.module.css";
import "./__Style.css";
export default function Filter({ check, schedule, item, handleSubmit }) {
  const [state, setState] = useState({
    show: false,
    collapse: null,
    rows: {},
  });
  const handelSetRow = (row) => {
    setState({
      ...state,
      rows: {
        [row?.id]: row,
      },
    });
  };
  const HandleSubmit = () => {
    setState({
      ...state,
      show: false,
    });
    handleSubmit(state?.rows);
  };
  const filterSchedule = get(schedule, "year");
  const _schedule = {};
  map(schedule, (d) =>
    map(d, (j) => {
      set(_schedule, `${j.parent}.${j.type}.${j.id}`, j);
    })
  );
  return (
    <div>
      <button
        className={`${Styles.mainBtn} btn`}
        onClick={() => {
          setState({ ...state, show: true });
        }}
      >
        Filter
      </button>
      <Modal
        show={!item || state?.show ? true : false}
        handleClose={() => {
          setState({ ...state, show: false });
        }}
        title="Filter"
        save="Filter"
        closeBtn="Close"
        handleSubmit={() => {
          HandleSubmit();
        }}
      >
        <div>
          <div className="row">
            {map(filterSchedule, (item, key) => {
              const itemResult = get(_schedule, item?.value);
              return (
                <div className={Styles.parentCollaspe} key={key}>
                  <div
                    className={`${Styles.parent} ${
                      get(check, item?.id) && Styles?.check
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={get(state?.rows, item?.id) ? true : false}
                      onClick={() => {
                        // alert(item);
                        handelSetRow(item);
                      }}
                    />
                    <div
                      className="w-75"
                      onClick={() => {
                        setState({ ...state, collapse: item?.id });
                      }}
                    >
                      {item?.value}
                    </div>
                  </div>
                  <Collapse
                    in={state?.collapse === item?.id ? true : false}
                    className="mx-2"
                  >
                    <div>
                      {map(itemResult, (sub, key) => {
                        return (
                          <div>
                            <div className={Styles.subparent}>{key}</div>
                            <div className="d-flex flex-wrap">
                              {map(sub, (item) => {
                                return (
                                  <div
                                    className={`${Styles.subItem} ${
                                      get(check, item?.id) && Styles?.check
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={
                                        get(state?.rows, item?.id)
                                          ? true
                                          : false
                                      }
                                      onClick={() => {
                                        handelSetRow(item);
                                      }}
                                    />
                                    {item?.value}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Collapse>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
}
