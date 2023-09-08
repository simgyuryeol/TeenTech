import React from "react";
import styles from "./test.module.css";
import ReactApexChart from "react-apexcharts";

// 컴포넌트의 속성(props) 정의
interface Props {
  name: string;
}

const Test: React.FC<Props> = ({ name }) => {
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

  return (
    <div>
      <div>2023.09.08</div>
      <div className={styles.test}>
        {/* <h2>{name}</h2> */}
        <div className={styles.sum}>
          <div className={styles.sumbox}>수입</div>
          <div>
            <img
              className={styles.plusImg}
              src="src/assets/plus.png"
              alt="plus"
            />
          </div>
          <div className={styles.sumbox}>지출</div>
          <div>
            <img
              className={styles.plusImg}
              src="src/assets/equal.png"
              alt="equal"
            />
          </div>
          <div className={styles.sumbox}>합계</div>
        </div>
        <div className={styles.chartBox}>
          <ReactApexChart
            options={donutData.options}
            series={donutData.series}
            type="donut"
          />
        </div>
        <div className={styles.chartBox}>
          <ReactApexChart
            options={donutData.options}
            series={donutData.series}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
};

export default Test;
