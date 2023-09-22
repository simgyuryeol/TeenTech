import React from "react";
import Card from "../Common/Card";
import ReactApexChart from "react-apexcharts";

const StockChart: React.FC = () => {
  const sampleData = [
    {
      x: new Date("2023-09-08").getDate(),
      y: 1180,
    },
    {
      x: new Date("2023-09-09").getDate(),
      y: 1150,
    },
    {
      x: new Date("2023-09-10").getDate(),
      y: 1100,
    },
    {
      x: new Date("2023-09-11").getDate(),
      y: 1200,
    },
    {
      x: new Date("2023-09-12").getDate(),
      y: 1250,
    },
    {
      x: new Date("2023-09-13").getDate(),
      y: 1230,
    },
  ];

  const stockData = {
    series: [
      {
        name: "Samsung",
        data: sampleData,
      },
    ],
    options: {
      chart: {
        stacked: false,
        height: 250,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: false,
            reset: true,
            customIcons: [],
          },
          autoSelected: "zoom",
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: "",
        align: "left",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          // formatter: function (val) {
          //   return (val / 1000000).toFixed(0);
          // },
        },
        title: {
          text: "가 격",
        },
      },
      xaxis: {
        type: "date",
        title: {
          text: "날 짜",
        },
      },
      tooltip: {
        shared: false,
        y: {
          // formatter: function (val) {
          //   return (val / 1000000).toFixed(0);
          // },
        },
      },
    },
  };

  return (
    <Card>
      <div className="flex justify-between items-center p-4" id="stock-today">
        <div>
          <p className="text-2xl font-bold">1,200원</p>
          <p className="text-gray-500">오늘 가격</p>
        </div>
        <p className=" text-red-500 text-lg font-bold">12.5%</p>
      </div>
      <ReactApexChart
        options={stockData.options}
        series={stockData.series}
        type="area"
        height={250}
        id="stock-chart"
      />
    </Card>
  );
};

export default StockChart;
