import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import samsungImg from "../../assets/stock/samsung.png";
import kakaoImg from "../../assets/stock/kakao.png";
import shinhanImg from "../../assets/stock/shinhan.png";
import ncsoftImg from "../../assets/stock/ncsoft.png";

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
  
  let imageSrc;
  switch (enName) {
    case "samsung":
      imageSrc = samsungImg;
      break;
    case "kakao":
      imageSrc = kakaoImg;
      break;
    case "ncsoft":
      imageSrc = ncsoftImg;
      break;
      case "shinhan":
      imageSrc = shinhanImg;
      break;
    default:
      imageSrc = "";
      break;
  }

  return (
    <Link to={`/StockDetail/${enName}`}>
      <div className="bg-white m-5 rounded-xl shadow-md flex justify-between p-2 text-black" id="my-stock">
          <div className="flex flex-col items-center p-4 ml-2">
            <img src={imageSrc} alt={enName} className="w-12 h-12"/>
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
      </div>
    </Link>
  );
};

export default MyStock;
