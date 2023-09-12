import React from "react";
import styles from "./Statics.module.css";
import ReactApexChart from "react-apexcharts";

const Statics: React.FC = () => {
  const donutData = {
    series: [10000, 5000, 1000, 200, 0],
    options: {
      chart: {
        type: "donut",
      },
      legend: {
        position: "right",
      },
      responsive: [
        {
          breakpoint: 200, // 반응형
        },
      ],
      plotOptions: {
        pie: {
          donut: {
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
      labels: ["용돈", "아르바이트", "퀴즈", "투자", "복권"],

      title: {
        align: "center",
      },
    },
  };

  const needExpense = 10;
  const wantExpense = 20;
  const totalExpense = needExpense + wantExpense;

  const needWidth = (needExpense / totalExpense) * 100;
  const wantWidth = (wantExpense / totalExpense) * 100;

  return (
    <div className="mx-4">
      <div className="drop-shadow-lg rounded-xl bg-white mb-5">
        <div className="flex justify-between items-center my-3 pt-3">
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
        <div>수입</div>
        <div className="mb-3">
          <ReactApexChart
            options={donutData.options}
            series={donutData.series}
            type="donut"
          />
        </div>
        <div className="text-left mx-2">
          <div className="decoration-black">지출</div>
          <div className="relative h-5 rounded-3xl overflow-hidden">
            <div
              className="h-full bg-lime-300	absolute"
              style={{
                width: `${needWidth}%`,
              }}
            >
              {" "}
            </div>
            <div
              className="h-full bg-orange-300 absolute"
              style={{
                width: `${wantWidth}%`,
                left: `${needWidth}%`,
              }}
            >
              {" "}
            </div>
          </div>
          <div>
            <div style={{ color: "black" }}>필요소비 : {needExpense}</div>
            <div style={{ color: "black" }}>욕구소비 : {wantExpense}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statics;
