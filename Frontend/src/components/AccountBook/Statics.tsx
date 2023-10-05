import React, { useState, useEffect } from "react";
import styles from "./Statics.module.css";
import ReactApexChart from "react-apexcharts";
import ApexOptions from "apexcharts";
import AccountBookImg from "../../../src/assets/main/accountbook.png";
import AlbaImg from "../../../src/assets/main/alba.png";
import QuizImg from "../../../src/assets/main/quiz.png";
import StockImg from "../../../src/assets/main/stock.png";
import LottoImg from "../../../src/assets/main/lotto.png";
import Plus from "../../../src/assets/plus.png";
import Equal from "../../../src/assets/equal.png";
import minus from "../../../src/assets/accountBook/minus.png";
import axios from "axios";
import { previousDay } from "date-fns";
import { childIdAtom } from "../../recoil/childIdAtom";
import { useRecoilState } from "recoil";

interface Props {
  spendingAmount: number;
  importAmount: number;
  date: string;
}

const Statics: React.FC<Props> = ({ spendingAmount, importAmount, date }) => {
  const [Datedata, setDatedata] = useState([]);
  const [consumptionTypeNull, setConsumptionTypeNull] = useState(false);
  const [expenditure, setExpenditure] = useState({
    욕구: 0,
    필요: 0,
  });
  const [sobi, setSobi] = useState(false);
  const total = importAmount - spendingAmount;
  const [childId] = useRecoilState(childIdAtom);

  const donutData: ApexCharts.ApexOptions = {
    series: [expenditure.욕구, expenditure.필요],

    chart: {
      type: "donut",
    },
    legend: {
      position: "bottom", // Same here
    },
    responsive: [
      {
        breakpoint: 200, // 반응형
      },
    ],
    dataLabels: {
      // formatter: function (val) {
      //   return val.toFixed(0) + "%";
      // },
      style: {
        fontSize: "14px",
        fontFamily: "mou",
        fontWeight: "light",
      },
    },
    colors: ["#B6DBEE", "#eeb6bf", "#bfeeb6", "#b6bfee", "#eec9b6"],
    plotOptions: {
      pie: {
        customScale: 1,
        offsetX: 0,
        offsetY: 0,
        expandOnClick: true,
      },
    },
    labels: ["욕구", "필요"],

    title: {
      align: "center",
    },
  };

  const [getData, setGetData] = useState([
    {
      name: "용돈",
      money: 0,
      imgSrc: AccountBookImg,
    },
    {
      name: "아르바이트",
      money: 0,
      imgSrc: AlbaImg,
    },
    {
      name: "퀴즈",
      money: 0,
      imgSrc: QuizImg,
    },
    {
      name: "투자",
      money: 0,
      imgSrc: StockImg,
    },
    {
      name: "복권",
      money: 0,
      imgSrc: LottoImg,
    },
  ]);

  const getDetail = () => {
    axios
      .get(
        `https://j9e207.p.ssafy.io/api/v1/${childId.id}/accountbooks/detail/${date}`
      )
      .then((response) => {
        setDatedata(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDetail();
  }, []);

  useEffect(() => {
    // getData의 money값을 모두 0으로 초기화
    let consumptionnull = false;
    let sobi = false;
    setExpenditure({ 욕구: 0, 필요: 0 });
    // setGetData((prevData) => prevData.map((data) => ({ ...data, money: 0 })));
    Datedata.forEach((item) => {
      // 수입
      if (item.assetType === "DEPOSIT") {
        if (item.content === "용돈") {
          setGetData((prevData) =>
            prevData.map((data) =>
              data.name === "용돈"
                ? { ...data, money: data.money + item.depositAmount }
                : data
            )
          );
        } else if (item.content === "투자") {
          setGetData((prevData) =>
            prevData.map((data) =>
              data.name === "투자"
                ? { ...data, money: data.money + item.depositAmount }
                : data
            )
          );
        } else if (item.content === "아르바이트") {
          setGetData((prevData) =>
            prevData.map((data) =>
              data.name === "아르바이트"
                ? { ...data, money: data.money + item.depositAmount }
                : data
            )
          );
        } else if (item.content === "퀴즈") {
          setGetData((prevData) =>
            prevData.map((data) =>
              data.name === "퀴즈"
                ? { ...data, money: data.money + item.depositAmount }
                : data
            )
          );
        } else if (item.content === "복권") {
          setGetData((prevData) =>
            prevData.map((data) =>
              data.name === "복권"
                ? { ...data, money: data.money + item.depositAmount }
                : data
            )
          );
        }
      }
      // 소비
      else if (item.assetType === "WITHDRAW") {
        sobi = true;
        if (item.consumptionType === null) {
          consumptionnull = true;
        } else if (
          item.consumptionType === "필요소비" ||
          item.consumptionType === "대출"
        ) {
          setExpenditure((prevExpenditure) => ({
            ...prevExpenditure,
            필요: prevExpenditure.필요 + item.withdrawalAmount,
          }));
        } else if (item.consumptionType === "욕구소비") {
          setExpenditure((prevExpenditure) => ({
            ...prevExpenditure,
            필요: prevExpenditure.필요 + item.withdrawalAmount,
          }));
        }
      }
    });
    setSobi(sobi);
    setConsumptionTypeNull(consumptionnull);
  }, [Datedata]);

  const [tab, setTab] = useState("소득");
  return (
    <div className="mx-4">
      <div className="drop-shadow-lg rounded-xl bg-white mb-5">
        <div className="flex justify-between items-center my-3 p-3">
          <div className={`${styles.sumbox} mx-2 text-blue-500`}>
            {importAmount || importAmount === 0
              ? importAmount.toLocaleString("ko-KR")
              : "Loading..."}
          </div>
          <div>
            <img className={styles.plusImg} src={minus} alt="minus" />
          </div>
          <div className={`${styles.sumbox} mx-2 text-red-500`}>
            {spendingAmount || spendingAmount === 0
              ? spendingAmount.toLocaleString("ko-KR")
              : "Loading..."}
          </div>
          <div>
            <img className={styles.plusImg} src={Equal} alt="equal" />
          </div>
          {total > 0 ? (
            <div className={`${styles.sumbox} mx-2 text-blue-500`}>
              {total || total === 0
                ? total.toLocaleString("ko-KR")
                : "Loading..."}
            </div>
          ) : (
            <div className={`${styles.sumbox} mx-2 text-red-500`}>
              {total || total === 0
                ? total.toLocaleString("ko-KR")
                : "Loading..."}
            </div>
          )}
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
            <div className="m-3 text-2xl">
              총 {importAmount.toLocaleString()}원 벌었어요!
            </div>
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
          <div>
            <div className="m-3 text-2xl text-start">
              총 {spendingAmount.toLocaleString()}원 썼어요!
            </div>
            <div className="flex justify-between items-center">
              <div className="mt-2">
                <ReactApexChart
                  options={donutData}
                  series={donutData.series}
                  type="pie"
                  width={180}
                />
              </div>
              <div className="rounded-lg mr-10 my-1 ">
                <div className="flex flex-col items-start	">
                  <div>
                    <div className="text-xl">욕구소비 : {expenditure.욕구}</div>
                  </div>
                  <div>
                    <div className="text-xl">필요소비 : {expenditure.필요}</div>
                  </div>
                </div>
              </div>
            </div>
            {sobi && consumptionTypeNull && (
              <div className="mt-3 pb-3 text-xl">
                <div>오늘의 가계부가 작성되지 않았어요.</div>
                <div>작성해주세요</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Statics;
