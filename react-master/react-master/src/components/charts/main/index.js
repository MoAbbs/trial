import "./styles.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { map } from "lodash";

export default function Chart(props) {
  const {data, chart, grid, yAxis, xAxis, tooltip, legend, bars} = props
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
      {...chart}
    >
      <CartesianGrid vertical={false} horizontal={true} {...grid} />
      <XAxis dataKey="name" {...xAxis}/>
      <YAxis {...yAxis}/>
      <Tooltip {...tooltip}/>
      <Legend {...legend}/>
      {map(bars, (bar, key)=>(
        <Bar key={key} {...bar} />
      ))}
    </BarChart>
  );
}
