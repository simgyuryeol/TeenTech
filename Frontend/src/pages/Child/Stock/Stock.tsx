import React from "react";
import { useNavigate } from "react-router-dom";
import StockPortfolio from "../../../components/Stock/StockPortfolio";
import MyStock from "../../../components/Stock/MyStock";

interface Stock {
  koName: string;
  enName: string;
  investment: number;
  value: number;
  gain: number;
  ror: number;
}

const Stock: React.FC = () => {
  const navigator = useNavigate();

  const handleClick = () => {
    navigator("/StockMarket");
  };

  const sampleData: Stock[] = [
    {
      koName: "삼성전자",
      enName: "samsung",
      investment: 1000,
      value: 900,
      gain: -100,
      ror: -10.0,
    },
    {
      koName: "카카오",
      enName: "kakao",
      investment: 1000,
      value: 1100,
      gain: 100,
      ror: 10.0,
    },
  ];

  return (
    <div className="mt-12">
      <StockPortfolio />
      <p className="font-bold text-xl">내 주식</p>
      {sampleData.map((stock, index) => (
        <MyStock key={index} stock={stock} />
      ))}
      <div>
        <button onClick={handleClick}>주식시장 둘러보기</button>
      </div>
    </div>
  );
};

export default Stock;
