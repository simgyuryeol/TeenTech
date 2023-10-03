import React from "react";
import Card from "../Common/Card";

const TradingSummary: React.FC = () => {
  const totalInvestment = "38,640";
  const realizedProfit = "3,290";
  const rateOfReturn = 9.87;

  return (
    <Card>
      <div className="flex justify-between p-4">
        <div className="flex flex-col items-start">
          <p>총 투자금</p>
          <p className="font-bold text-xl pt-1">￦{totalInvestment}</p>
        </div>
      </div>
      <div className="flex justify-between p-4">
        <div>
          <p>총 실현 손익</p>
          <p className="font-bold text-lg pt-1 text-left">￦{realizedProfit}</p>
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

export default TradingSummary;
