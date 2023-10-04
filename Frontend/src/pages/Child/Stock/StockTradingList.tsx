import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TradingSummary from "../../../components/Stock/TradingSummary";
import TradingRecords from "../../../components/Stock/TradingRecords";
import Bot from "../Bot/Bot";

const StockTradingList: React.FC = () => {
  const [tradingHistory, setTradingHistory] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [realizedProfit, setRealizedProfit] = useState(0);
  const [rateOfReturn, setRateOfReturn] = useState(0);
  const navigator = useNavigate();

  useEffect(() => {
    axios
      // .post(import.meta.env.VITE_BASE_URL + `/api/v1/${child_id}/deposits/create`, {
      .get(import.meta.env.VITE_BASE_URL + `/api/v1/34/investments/sales`)
      .then((response) => {
        const fetchedData = response.data.data;
        console.log("DATA FETCHED:", fetchedData);
        setTotalInvestment(fetchedData.totalInvestment);
        setRealizedProfit(fetchedData.totalNetProfit);
        setRateOfReturn(fetchedData.rateOfReturn);
        setTradingHistory(fetchedData.tradingRecordsResponseDtoList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClick = () => {
    navigator("/StockMarket");
  };

  return (
    <div className="mt-16">
      {/* 챗봇 */}
      <div style={{ position: "fixed", bottom: 0, right: 0, zIndex: 9999 }}>
        <div className="flex items-end">
          <div className="bg-sky-200 rounded-lg drop-shadow-md p-2 mb-3">
            질문해줘
          </div>
          <Bot />
        </div>
      </div>
      <div className="p-2" />
      <TradingSummary
        totalInvestment={totalInvestment}
        realizedProfit={realizedProfit}
        rateOfReturn={rateOfReturn}
      />

      <div className="mx-5 px-2 pt-5 flex flex-col items-start justify-between">
        <p className="text-2xl font-bold text-gray-900 mb-1">주식 매매 기록</p>
        <p className="text-gray-500">지금까지 어떤 주식을 사고 팔았을까요?</p>
      </div>
      {tradingHistory.length ? (
        <TradingRecords history={tradingHistory}/>
      ) : (
        <div className="bg-rose-100 m-5 px-4 py-8 rounded-xl text-lg">
          아직 주식을 사고 판 기록이 없어요.
          <br />
          주식시장을 둘러보고 원하는 주식을 사볼까요?
          <button
            onClick={handleClick}
            id="stock-market"
            className="bg-indigo-200 mt-8"
          >
            주식시장 둘러보기
          </button>
        </div>
      )}
    </div>
  );
};

export default StockTradingList;
