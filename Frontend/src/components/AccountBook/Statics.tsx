import React, { useState } from "react";
import styles from "./Statics.module.css";
import ReactApexChart from "react-apexcharts";

const Statics: React.FC = () => {
  const donutData = {
    series: [10000, 5000],
    options: {
      chart: {
        type: "donut",
      },
      legend: {
        position: "bottom",
      },
      responsive: [
        {
          breakpoint: 200, // 반응형
        },
      ],
      dataLabels: {
        formatter: function (val) {
          return val.toFixed(0) + "%";
        },
        style: {
          fontSize: "14px",
          fontFamily: "mou",
          fontWeight: "light",
        },
      },
      colors: ["#B6DBEE", "#eeb6bf", "#bfeeb6", "#b6bfee", "#eec9b6"],
      plotOptions: {
        pie: {
          pie: {
            labels: {
              showAlways: true,
              show: true,
              name: {
                label: "ALARM",
                fontSize: "12px",
                color: "black",
              },
              value: {
                sfontSize: "22px",
                color: "blue",
              },
            },
          },
        },
      },
      labels: ["욕구", "필요"],

      title: {
        align: "center",
      },
    },
  };

  const getData = [
    {
      name: "용돈",
      money: 10000,
      imgSrc: "../../../src/assets/main/accountbook.png",
    },
    {
      name: "아르바이트",
      money: 10000,
      imgSrc: "../../../src/assets/main/alba.png",
    },
    {
      name: "퀴즈",
      money: 10000,
      imgSrc: "../../../src/assets/main/quiz.png",
    },
    {
      name: "투자",
      money: 10000,
      imgSrc: "../../../src/assets/main/stock.png",
    },
    {
      name: "복권",
      money: 10000,
      imgSrc: "../../../src/assets/main/lotto.png",
    },
  ];

  const needExpense = 10;
  const wantExpense = 20;
  const totalExpense = needExpense + wantExpense;

  const needWidth = (needExpense / totalExpense) * 100;
  const wantWidth = (wantExpense / totalExpense) * 100;

  const [tab, setTab] = useState("소득");
  return (
    <div className="mx-4">
      <div className="drop-shadow-lg rounded-xl bg-white mb-5">
        <div className="flex justify-between items-center my-3 p-3">
          <div className={`${styles.sumbox} mx-2`}>수입</div>
          <div>
            <img
              className={styles.plusImg}
              src="src\assets\plus.png"
              alt="plus"
            />
          </div>
          <div className={`${styles.sumbox} mx-2`}>지출</div>
          <div>
            <img
              className={styles.plusImg}
              src="src\assets\equal.png"
              alt="equal"
            />
          </div>
          <div className={`${styles.sumbox} mx-2`}>합계</div>
        </div>
      </div>
      <div className="drop-shadow-lg rounded-xl bg-white mb-5">
        <div className="border-b">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li className="mr-2">
              <a
                onClick={() => setTab("소득")}
                className={`text-xl inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${
                  tab === "소득"
                    ? "text-blue-600 border-blue-600 active border-b-2"
                    : "text-gray-600 border-transparent"
                }`}
              >
                소득
              </a>
            </li>
            <li className="mr-2">
              <a
                onClick={() => setTab("지출")}
                className={`text-xl inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${
                  tab === "지출"
                    ? "text-blue-600 border-blue-600 active border-b-2"
                    : "text-gray-600 border-transparent"
                }`}
              >
                지출
              </a>
            </li>
          </ul>
        </div>
        {tab === "소득" && (
          <div className="text-start py-2">
            <div className="m-3 text-2xl">총 20,000원 벌었어요!</div>
            {getData.map((item, index) => (
              <div
                className="rounded-lg mx-5 my-1 flex justify-between"
                key={index}
              >
                <div className="flex justify-between items-center">
                  <img
                    src={item.imgSrc}
                    style={{ width: "30px", height: "30px" }}
                  />
                  <div className="m-3 text-xl">{item.name}</div>
                </div>

                <div className="m-3 text-xl">{item.money.toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
        {tab === "지출" && (
          <div className="flex justify-between items-center">
            <div className="mt-2">
              <ReactApexChart
                options={donutData.options}
                series={donutData.series}
                type="pie"
                width={180}
              />
            </div>
            <div className="rounded-lg mr-10 my-1 ">
              <div className="flex flex-col items-start	">
                {/* <div className="flex justify-between items-center">
                  <img
                    src="../../../src/assets/main/lotto.png"
                    style={{ width: "30px", height: "30px" }}
                  /> */}
                <div>
                  <div className="text-xl">욕구소비 : 10,000</div>
                </div>
                <div>
                  <div className="text-xl">필요소비 : 10,000</div>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statics;
