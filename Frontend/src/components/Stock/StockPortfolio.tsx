import React from "react";
import Card from "../Common/Card";
import { useNavigate } from "react-router-dom";

interface StockPortfolioProps {
  totalValue: number;
  totalGain: number;
  averageROR: number;
}

const StockPortfolio: React.FC<StockPortfolioProps> = (props) => {
  const navigator = useNavigate();

  const handleClick = () => {
    navigator("/StockTradingList");
  };

  return (
    <Card className="bg-sky-100 ">
      <div className="flex justify-between p-4">
        <div className="flex flex-col items-start" id="portfolio-today">
          <p>포트폴리오 자산</p>
          {props.totalValue ? (
            <p className="font-bold text-xl pt-1">
              ￦{props.totalValue.toLocaleString()}
            </p>
          ) : (
            <p>-</p>
          )}
        </div>
        <button onClick={handleClick} id="trading-btn" className="bg-amber-50">
          매매내역
        </button>
      </div>
      <div className="flex justify-between p-4" id="portfolio-profit">
        <div>
          <p>총 손익</p>
          {props.totalGain ? (
            <p className="font-bold text-lg pt-1">
              ￦{props.totalGain.toLocaleString()}
            </p>
          ) : (
            <p>-</p>
          )}
        </div>
        <div>
          <p>수익률</p>
          {isNaN(props.averageROR) ? (
            <p className="font-bold text-lg pt-1">-</p>
          ) : (
            <>
              {props.averageROR > 0 ? (
                <p className="font-bold text-lg pt-1 text-red-600">
                  {/* +{props.averageROR}% */}+{props.averageROR.toFixed(2)}%
                </p>
              ) : (
                <p className="font-bold text-lg pt-1 text-blue-700">
                  {/* {props.averageROR}% */}
                  {props.averageROR.toFixed(2)}%
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StockPortfolio;
