import React from "react";
import ReactApexChart from "react-apexcharts";

const QuizChart: React.FC = () => {
  const pieData = {
    series: [75, 25],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["정답", "오답"],
      dataLabels: {
        formatter: function (val) {
          return val.toFixed(0) + "%";
        },
        style: {
          fontSize: "14px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: "light",
        },
      },
      colors: ["#B6DBEE", "#eeb6bf", "#bfeeb6", "#b6bfee", "#eec9b6"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <ReactApexChart
      options={pieData.options}
      series={pieData.series}
      type="pie"
      width={380}
    />
  );
};

export default QuizChart;
