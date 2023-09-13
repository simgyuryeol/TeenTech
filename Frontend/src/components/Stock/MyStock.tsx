import React from "react";
import Card from "../Common/Card";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

interface Stock {
  koName: string;
  enName: string;
  investment: number;
  value: number;
  gain: number;
  ror: number;
}

interface MyStockProps {
  stock: Stock;
}

const MyStock: React.FC<MyStockProps> = (props) => {
  const { koName, enName, investment, value, gain, ror } = props.stock;
  return (
    <Link to={`/StockDetail/${enName}`}>
      <Card className="flex justify-between p-2 text-black">
        <div className="flex flex-col items-center">
          <img src="" alt={enName} />
          <p className="ml-2 text-md font-bold">{koName}</p>
        </div>

        <div className="flex">
          <div>
            <p className="m-2 text-2xl font-bold">
              {value}
              <span className="text-sm">원</span>
            </p>
            <div className="flex flex-col justify-between text-sm">
              <p>투자금: {investment}원</p>
              <p className="pl-5">손익: {gain}원</p>
            </div>
          </div>

          <div className="flex items-center m-5">
            {ror > 0 ? (
              <div className="flex flex-col items-center text-red-600">
                <Icon icon="circum:circle-chev-up" className="w-10 h-10" />
                <p className="text-sm">+{ror}%</p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-blue-700">
                <Icon icon="circum:circle-chev-down" className="w-10 h-10" />
                <p className="text-sm">{ror}%</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default MyStock;
