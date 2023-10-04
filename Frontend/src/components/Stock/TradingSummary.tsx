import React from "react";
import Card from "../Common/Card";
import { number } from "prop-types";

interface TradingSummaryProp {
  totalInvestment: number;
  realizedProfit: number;
  rateOfReturn: number;
}

const TradingSummary: React.FC<TradingSummaryProp> = (props) => {
  const totalInvestment = props.totalInvestment.toLocaleString();
  const realizedProfit = props.realizedProfit.toLocaleString();
  const rateOfReturn = props.rateOfReturn

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
