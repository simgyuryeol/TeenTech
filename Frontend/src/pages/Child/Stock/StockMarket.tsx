import React from "react";
import MarketStock from "../../../components/Stock/MarketStock";

interface Stock {
  koName: string;
  enName: string;
  value: number;
  priceChange: number;
  priceChangePercentage: number;
}

const StockMarket: React.FC = () => {
  const sampleData: Stock[] = [
    {
      koName: "삼성전자",
      enName: "samsung",
      value: 900,
      priceChange: -100,
      priceChangePercentage: -10.0,
    },
    {
      koName: "카카오",
      enName: "kakao",
      value: 1100,
      priceChange: 100,
      priceChangePercentage: 10.0,
    },
    {
      koName: "엔씨소프트",
      enName: "ncsoft",
      value: 900,
      priceChange: -100,
      priceChangePercentage: -10.0,
    },
    {
      koName: "신한은행",
      enName: "shinhan",
      value: 1100,
      priceChange: 100,
      priceChangePercentage: 10.0,
    },
  ];

  return (
    <div className="mt-12">
      <h2 className="font-bold text-xl">자식 주식 시장 페이지</h2>
      {sampleData.map((stock, index) => (
        <MarketStock key={index} stock={stock} />
      ))}
    </div>
  );
};

export default StockMarket;
