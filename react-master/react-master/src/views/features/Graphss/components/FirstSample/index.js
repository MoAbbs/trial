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
      name: "March 2014",
      uv: 590,
      "Total Assets": 900,
      "Net & plant equipment": 400,
      Sales: 200,
    },
    {
      name: "March 2015",
      uv: 868,
      "Total Assets": 967,
      "Net & plant equipment": 400,
      Sales: 200,
    },
    {
      name: "March 2016",
      uv: 1397,
      "Total Assets": 1098,
      "Net & plant equipment": 400,
      Sales: 200,
    },
    {
      name: "March 2017",
      uv: 1480,
      "Total Assets": 1200,
      "Net & plant equipment": 400,
      Sales: 200,
    },
    {
      name: "March 2018",
      uv: 1520,
      "Total Assets": 1108,
      "Net & plant equipment": 400,
      Sales: 200,
    },
    {
      name: "March 2019",
      uv: 1400,
      "Total Assets": 680,
      "Net & plant equipment": 400,
      Sales: 200,
    },
    {
      name: "Mar Progress",
      uv: 1400,
      "Total Assets": 680,
      "Net & plant equipment": 400,
      Sales: 200,
    },
  ];
  let { finical, revenue } = props;
  console.log(finical);
  return (
    <Fragment>
      <div
        style={{
          width: "100%",
          height: 400,
          backgroundColor: "#0b151f",
          borderRadius: "12px",
          padding: "25px 15px",
        }}
      >
        <div className="DFLEX">
          <h3 className={Styles.headTxt}>
            {finical === "finical"
              ? "Finical Structure"
              : revenue === "revenue"
              ? "Revenue & Profit"
              : "Operating performance"}
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
            <Bar dataKey="Total Assets" barSize={20} fill="#44bb91" />
            <Bar dataKey="Net & plant equipment" barSize={20} fill="#cb2c32" />
            <Bar dataKey="Sales" barSize={20} fill="#4824e9" />
            <Line type="monotone" dataKey="uv" stroke="#fff" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Fragment>
  );
}
