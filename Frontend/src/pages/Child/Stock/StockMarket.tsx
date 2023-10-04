import React, { useState, useEffect } from "react";
import axios from "axios";
import MarketStock from "../../../components/Stock/MarketStock";
import CountdownTimer from "../../../components/Stock/CountdownTimer/CountdownTimer";
import clockImg from "../../../assets/stock/clock.png";

interface Stock {
  companyName: string;
  value: number;
  priceChange: number;
  priceChangePercentage: number;
}

const StockMarket: React.FC = () => {
  const companyNameList = ["삼성전자", "카카오", "KB금융", "LG화학"];
  const [stockList, setStockList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = companyNameList.map(async (companyName) => {
          const response = await axios.post(
            import.meta.env.VITE_BASE_URL + "/api/v1/34/investments/detail",
            {
              companyName: companyName,
            }
          );
          return response.data.data;
        });

        const results = await Promise.all(promises);
        setStockList((prevStockList) => {
          const newStockList = [...prevStockList];
          for (const result of results) {
            const slicedStockList = result.stockList.slice(-2);

            for (let i = 1; i < slicedStockList.length; i++) {
              const currentStock = slicedStockList[i];
              const prevStock = slicedStockList[i - 1];

              const priceChange = currentStock.price - prevStock.price;
              const priceChangePercentage =
                ((currentStock.price - prevStock.price) / prevStock.price) *
                100;

              const newStock: Stock = {
                companyName: currentStock.companyName,
                value: currentStock.price,
                priceChange: priceChange,
                priceChangePercentage: priceChangePercentage,
              };

              const isDuplicate = newStockList.some(
                (stock) => stock.companyName === newStock.companyName
              );

              if (!isDuplicate) {
                newStockList.push(newStock);
              }
            }
          }
          return newStockList;
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const NOW_IN_MS = new Date().getTime();

  const nextDay = new Date(NOW_IN_MS);
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay.setHours(15, 0, 0, 0);

  const handleCountdownZero = () => {
    window.location.reload();
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

      {stockList.map((stock, index) => (
        <MarketStock key={index} stock={stock} />
      ))}
    </div>
  );
};

export default StockMarket;
