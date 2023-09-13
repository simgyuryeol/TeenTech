import React from "react";
import TradingSummary from "../../../components/Stock/TradingSummary";
import TradingRecords from "../../../components/Stock/TradingRecords";

const StockTradingList: React.FC = () => {
  return (
    <div className="mt-12">
      <TradingSummary />

      <div className="p-4 flex flex-col items-start justify-between">
        <p className="text-xl font-bold text-gray-900 mb-1">주식 매매 기록</p>
        <p className="text-sm font-normal text-gray-500">
          지금까지 어떤 주식을 사고 팔았을까요?
        </p>
      </div>

      <TradingRecords />
    </div>
  );
};

export default StockTradingList;
