import React from "react";
import MarketStock from "../../../components/Stock/MarketStock";
import CountdownTimer from "../../../components/Stock/CountdownTimer/CountdownTimer";
import clockImg from "../../../assets/stock/clock.png";

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
      koName: "신한은행",
      enName: "shinhan",
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
  ];

  const NOW_IN_MS = new Date().getTime();

  const nextDay = new Date(NOW_IN_MS);
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay.setHours(15, 0, 0, 0);

  const handleCountdownZero = () => {
    console.log("오후 4시 정각");
  };

  return (
    <div className="mt-20 ">
      <div className="mx-5 p-8 bg-bgblue rounded-xl drop-shadow-lg flex items-center justify-between">
        <img src={clockImg} alt="" className="w-20 h-20" />

        <div>
          <p className="text-xl py-2">주식 가격이 바뀌기까지</p>
          <CountdownTimer
            targetHour={16}
            onCountdownZero={handleCountdownZero}
          />
        </div>
      </div>

      {sampleData.map((stock, index) => (
        <MarketStock key={index} stock={stock} />
      ))}
    </div>
  );
};

export default StockMarket;
