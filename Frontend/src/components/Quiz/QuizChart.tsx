import React from "react";
import ReactApexChart from "react-apexcharts";

const QuizChart: React.FC = () => {
  const pieData = {
    series: [75, 25],
    options: {
      chart: {
        width: 380,
        type: "pie" as const,
      },
      labels: ["정답", "오답"],
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
