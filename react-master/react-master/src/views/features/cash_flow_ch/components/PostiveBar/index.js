import { first, last, max, round } from "lodash";
import React from "react";
import ReactApexChart from "react-apexcharts";
export default class ApexChart extends React.Component {
  render() {
    const { data } = this.props;
    const val = max([first(data)?.mainVal, -last(data)?.mainVal], 5000)
    const series = [
      { name: "Cash Out", data: data.map((d) => d.cashOut) },
      { name: "Cash In", data: data.map((d) => d.cashIn) },
    ];
    const options = {
      chart: {
        toolbar: { show: false },
        type: "bar",
        height: "30px",
        stacked: true,
      },
      colors: ["#cb2c32", "#0aab51"],
      plotOptions: {
        bar: {
          track: {
            background: '#1cbd00'
          },
          borderRadius: 5,
          // endingShape: 'rounded',
          // startShape: 'rounded',
          // borderRadiusOnAllStackedSeries: true,
          horizontal: true,
          // barWidth: '100%',
          barHeight: "80px",
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },

      grid: {
        show: false,
      },
      yaxis: {
        min: -val*1.2,
        max: val*1.2,
        title: {
          // text: 'Age',
        },
      },
      tooltip: {
        shared: false,
        x: {
          formatter: function (val) {
            return round(val, 2);
          },
        },
        y: {
          formatter: function (val) {
            return round(val, 2);
          },
        },
      },
      title: {
        text: "",
      },
      xaxis: {
        categories: data?.map((d) => d.item),
        title: {
          text: "Item",
        },
        labels: {
          formatter: function (val) {
            return round(val, 2);
          },
        },
      },
    };
    return (
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height="1400"
        />
      </div>
    );
  }
}
