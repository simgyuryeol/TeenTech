import React from "react";
import Card from "../Common/Card";
import { useNavigate } from "react-router-dom";

const StockPortfolio: React.FC = () => {
  const navigator = useNavigate();

  const currentValue = "38,640";
  const totalGain = "3,290";
  const rateOfReturn = 9.87;

  const handleClick = () => {
    navigator("/StockTradingList");
  };

  return (
    <Card className="bg-sky-100 ">
      <div className="flex justify-between p-4">
        <div className="flex flex-col items-start" id="portfolio-today">
          <p>포트폴리오 자산</p>
          <p className="font-bold text-xl pt-1">￦{currentValue}</p>
        </div>
        <button onClick={handleClick} id="trading-btn" className="bg-amber-50">
          매매내역
        </button>
      </div>
      <div className="flex justify-between p-4" id="portfolio-profit">
        <div>
          <p>총 손익</p>
          <p className="font-bold text-lg pt-1">￦{totalGain}</p>
        </div>
        <div>
          <p>수익률</p>
          {rateOfReturn > 0 ? (
            <p className="font-bold text-lg pt-1 text-red-600">
              +{rateOfReturn}%
            </p>
          ) : (
            <p className="font-bold text-lg pt-1 text-blue-700">
              {rateOfReturn}%
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StockPortfolio;
