import React from "react";
import Card from "../Common/Card";
import ReactApexChart from "react-apexcharts";

const StockChart: React.FC = () => {
  const sampleData = [
    {
      x: new Date("2023-09-08"),
      y: 1180,
    },
    {
      x: new Date("2023-09-09"),
      y: 1150,
    },
    {
      x: new Date("2023-09-10"),
      y: 1100,
    },
    {
      x: new Date("2023-09-11"),
      y: 1200,
    },
    {
      x: new Date("2023-09-12"),
      y: 1250,
    },
    {
      x: new Date("2023-09-13"),
      y: 1230,
    },
  ];
  const stockData: ApexCharts.ApexOptions = {
    series: [
      {
        name: "Samsung",
        data: sampleData,
      },
    ],
    chart: {
      type: "area",
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
    xaxis: {
      type: "datetime",
      title: {
        text: "날  짜",
        offsetX: -15,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: "15px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 600,
          cssClass: "apexcharts-xaxis-title",
        },
      },
      labels: {
        format: "dd", // day of the month
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
      },
    },
    yaxis: {
      tickAmount: 6, // 원하는 눈금 개수
      labels: {
        // formatter: function (val) {
        //   return (val / 1000000).toFixed(0);
        // },
      },
      title: {
        text: "가  격",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: "15px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 600,
          cssClass: "apexcharts-xaxis-title",
        },
      },
    },

    theme: {
      monochrome: {
        shadeIntensity: 1,
      },
    },
    fill: {
      gradient: {
        inverseColors: false,
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
        options={stockData}
        series={stockData.series}
        type="area"
        height={250}
        id="stock-chart"
      />
    </Card>
  );
};

export default StockChart;
