import React from "react";
import Card from "../Common/Card";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

interface Stock {
  koName: string;
  enName: string;
  value: number;
  priceChange: number;
  priceChangePercentage: number;
}

interface MarketStockProps {
  stock: Stock;
}

const MarketStock: React.FC<MarketStockProps> = (props) => {
  const { koName, enName, value, priceChange, priceChangePercentage } =
    props.stock;
  return (
    <Link to={`/StockDetail/${enName}`}>
      <Card className="flex justify-between p-2 text-black">
        <div className="flex flex-col items-center">
          <img src="" alt={enName} />
          <p className="ml-2 text-md font-bold">{koName}</p>
        </div>

        <div className="flex items-center">
          <div className="text-2xl font-bold">
            {value}
            <span className="text-sm">원</span>
          </div>

          <div className="flex items-center m-5">
            {priceChangePercentage > 0 ? (
              <div className="flex flex-col items-center text-red-600">
                <Icon icon="circum:circle-chev-up" className="w-10 h-10" />
                <p className="text-sm">
                  {priceChange}원(+{priceChangePercentage}%)
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-blue-700">
                <Icon icon="circum:circle-chev-down" className="w-10 h-10" />
                <p className="text-sm">
                  {priceChange}원({priceChangePercentage}%)
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default MarketStock;
