import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import samsungImg from "../../assets/stock/samsung.png";
import kakaoImg from "../../assets/stock/kakao.png";
import shinhanImg from "../../assets/stock/shinhan.png";
import ncsoftImg from "../../assets/stock/ncsoft.png";

interface MyStockProps {
  stock: StockBought;
}

const MyStock: React.FC<MyStockProps> = (props) => {
  const { companyName, investment, value, gain, ror } = props.stock;
  console.log("log from My Stock: ", props.stock );
  
  let imageSrc: string;
  switch (companyName) {
    case "삼성전자":
      imageSrc = samsungImg;
      break;
    case "카카오":
      imageSrc = kakaoImg;
      break;
    case "LG화학":
      imageSrc = ncsoftImg;
      break;
      case "KB금융":
      imageSrc = shinhanImg;
      break;
    default:
      imageSrc = "";
      break;
  }

  return (
    <Link to={`/StockDetail/${companyName}`}>
      <div className="bg-white m-5 rounded-xl shadow-md flex justify-between p-2 text-black" id="my-stock">
          <div className="flex flex-col items-center p-4 ml-2">
            <img src={imageSrc} alt={companyName} className="w-12 h-12"/>
            <p className="ml-2 text-md font-bold">{companyName}</p>
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
