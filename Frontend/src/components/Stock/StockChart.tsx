import React from "react";
import Card from "../Common/Card";
import ReactApexChart from "react-apexcharts";
import ko from "apexcharts/dist/locales/ko.json";

interface PriceDataPoint {
  x: string;
  y: number;
}

interface StockChart {
  stockName: string;
  price: number;
  priceChangePercentage: number;
  priceData: PriceDataPoint[];
}

interface StockChartProp {
  stockInfo: StockChart;
  maskedStockName: string;
}

const StockChart: React.FC<StockChartProp> = ({ stockInfo, maskedStockName }) => {
  const priceToString = stockInfo.price.toLocaleString();
  const stockData: ApexCharts.ApexOptions = {
    series: [
      {
        name: maskedStockName,
        data: stockInfo.priceData,
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
      locales: [ko],
      defaultLocale: "ko",
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
          fontFamily: "OMU, Helvetica, Arial, sans-serif",
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
        formatter: function(val) {
          return val.toLocaleString();
        },
      },
      title: {
        text: "가  격",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: "15px",
          fontFamily: "OMU, Helvetica, Arial, sans-serif",
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
    tooltip: {
      x: {
        formatter: function(val) {
          const date = new Date(val);
          const month = date.getMonth() + 1;
          const day = date.getDate();
          return `${month}월 ${day}일`;
        },
      },
    },
  };

  return (
    <Card>
      <div className="flex justify-between items-center p-4" id="stock-today">
        <div>
          <p className="text-2xl font-bold">{priceToString}원</p>
          <p className="text-gray-500">오늘 가격</p>
        </div>
        {stockInfo.priceChangePercentage > 0 ? (
          <p className=" text-red-500 text-lg font-bold">
            {stockInfo.priceChangePercentage}%
          </p>
        ) : (
          <p className=" text-blue-500 text-lg font-bold">
            {stockInfo.priceChangePercentage}%
          </p>
        )}
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
