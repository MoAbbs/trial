import React, { Fragment } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Styles from "./style.module.css";

export default function FirstSample(props) {
  const data = [
    {
      name: "2014",
      "Net & plant equipment": 590,
      "Total Assets": 900,
    },
    {
      name: "2015",
      "Net & plant equipment": 868,
      "Total Assets": 967,
    },
    {
      name: "2016",
      "Net & plant equipment": 1397,
      "Total Assets": 1098,
    },
    {
      name: "2017",
      "Net & plant equipment": 1480,
      "Total Assets": 1200,
    },
    {
      name: "2018",
      "Net & plant equipment": 1520,
      "Total Assets": 1108,
    },
    {
      name: "2019",
      "Net & plant equipment": 1400,
      "Total Assets": 680,
    },
    {
      name: "2020",
      "Net & plant equipment": 1400,
      "Total Assets": 680,
      Sales: 200,
    },
  ];
  let { ebitda } = props;
  return (
    <Fragment>
      <div
        style={{
          width: "100%",
          height: 420,
          backgroundColor: "#0b151f",
          borderRadius: "12px",
          padding: "25px 15px",
        }}
      >
        <div className="DFLEX">
          <h3 className={Styles.headTxt}>
            {ebitda === "ebitda"
              ? "EBITDA & EBITDA Margin"
              : "Net Profit & Net Profit Margin"}
          </h3>
          <div className="dropdown">
            <button
              className={`${Styles.btnStyle} btn dropdown-toggle`}
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              March
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="5">
                  June
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="6">
                  July
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="7">
                  May
                </a>
              </li>
            </ul>
          </div>
        </div>
        <ResponsiveContainer>
          <ComposedChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#fff" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Total Assets" barSize={20} fill="#63abf0" />
            <Line
              type="monotone"
              dataKey="Net & plant equipment"
              stroke="#fff"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Fragment>
  );
}
