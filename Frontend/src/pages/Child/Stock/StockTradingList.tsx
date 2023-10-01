import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TradingSummary from "../../../components/Stock/TradingSummary";
import TradingRecords from "../../../components/Stock/TradingRecords";

const StockTradingList: React.FC = () => {
  const [tradingHistory, setTradingHistory] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    axios
      // .post(import.meta.env.VITE_BASE_URL + `/api/v1/${child_id}/deposits/create`, {
      .get(import.meta.env.VITE_BASE_URL + `/api/v1/34/investments/sales`)
      .then((response) => {
        console.log(response.data);
        setTradingHistory(response.data);
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
      <div className="p-2" />
      <TradingSummary />

      <div className="mx-5 px-2 pt-5 flex flex-col items-start justify-between">
        <p className="text-2xl font-bold text-gray-900 mb-1">주식 매매 기록</p>
        <p className="text-gray-500">지금까지 어떤 주식을 사고 팔았을까요?</p>
      </div>
      {tradingHistory.length ? (
        <TradingRecords history={tradingHistory} />
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
