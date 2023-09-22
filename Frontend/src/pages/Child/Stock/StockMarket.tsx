import React from "react";
import MarketStock from "../../../components/Stock/MarketStock";
import CountdownTimer from "../../../components/Stock/CountdownTimer/CountdownTimer";
import Card from "../../../components/Common/Card";

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

  const NOW_IN_MS = new Date().getTime();

  const nextDay = new Date(NOW_IN_MS);
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay.setHours(15, 0, 0, 0);

  const handleCountdownZero = () => {
    console.log("오후 4시 정각");
  };

  return (
    <div className="mt-12">
      <Card className="pt-6 border border-red-500">
        <p className="text-2xl">주식 가격 업뎃까지...</p>
        <CountdownTimer targetHour={16} onCountdownZero={handleCountdownZero} />
      </Card>
      {sampleData.map((stock, index) => (
        <MarketStock key={index} stock={stock} />
      ))}
    </div>
  );
};

export default StockMarket;
