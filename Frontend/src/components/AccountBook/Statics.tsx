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
    <div className={styles.testcomponenet}>
      <div style={{color:"black"}}>2023.09</div>
      <div className={styles.test}>
        <div className={styles.sum}>
          <div className={styles.sumbox}>수입</div>
          <div>
            <img
              className={styles.plusImg}
              src="plus.png"
              alt="plus"
            />
          </div>
          <div className={styles.sumbox}>지출</div>
          <div>
            <img
              className={styles.plusImg}
              src="equal.png"
              alt="equal"
            />
          </div>
          <div className={styles.sumbox}>합계</div>
        </div>
        <div>수입</div>
        <div className={styles.chartBox}>
          <ReactApexChart
            options={donutData.options}
            series={donutData.series}
            type="donut"
          />
        </div>
      </div>
      
      <div style={{textAlign:"left"}}>
        <div style={{color:"black"}}>지출</div>
        <div style={{ backgroundColor: "yellow", height: '20px', position: 'relative', borderRadius:'50px', overflow: 'hidden' }}>
          <div style={{ backgroundColor: "green", height: '100%', width: `${needWidth}%`, position: 'absolute', left: 0 }}> </div>
          <div style={{ backgroundColor: "blue", height: '100%', width: `${wantWidth}%`, position: 'absolute', left: `${needWidth}%` }}> </div>
        </div>
        <div>
          <div style={{color:"black"}}>필요소비 : { needExpense }</div>
          <div style={{color:"black"}}>욕구소비 : { wantExpense }</div>
        </div>
      </div>

    </div>
  );
};

export default Statics;
