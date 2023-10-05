import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "../../../components/Common/Modal";
import StockChart from "../../../components/Stock/StockChart";
import StockNews from "../../../components/Stock/StockNews";
import BuyStock from "../../../components/Stock/BuyStock";
import SellStock from "../../../components/Stock/SellStock";
import { Icon } from "@iconify/react/dist/iconify.js";
import { childIdAtom } from "../../../recoil/childIdAtom";
import { useRecoilValue } from "recoil";

import "intro.js/introjs.css";
import { Steps } from "intro.js-react";
import {
  tourOptions,
  tourSteps,
} from "../../../components/Tutorial/StockDetailTutorial";

const StockDetail: React.FC = () => {
  const { companyName } = useParams();
  const [companyNews, setCompanyNews] = useState([]);
  const [stockChartInfo, setStockChartInfo] = useState(null);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const child = useRecoilValue(childIdAtom);

  let maskedCompanyName: string;
  switch (companyName) {
    case "삼성전자":
      maskedCompanyName = "싸피전자";
      break;
    case "카카오":
      maskedCompanyName = "싸피IT";
      break;
    case "LG화학":
      maskedCompanyName = "싸피화학";
      break;
    case "KB금융":
      maskedCompanyName = "싸피금융";
      break;
    default:
      maskedCompanyName = "";
      break;
  }

  useEffect(() => {
    axios
      .post(
        import.meta.env.VITE_BASE_URL +
          `/api/v1/${child.id}/investments/detail`,
        {
          companyName: companyName,
        }
      )
      .then((response) => {
        const stockList = response.data.data.stockList;
        const slicedStockList = stockList.slice(-2);

        const currentStock = slicedStockList[1];
        const prevStock = slicedStockList[0];

        const priceChangePercentage = Number(
          ((currentStock.price - prevStock.price) / prevStock.price) * 100
        ).toFixed(2);

        const priceData = stockList.map((stock) => ({
          x: stock.stockDate,
          y: stock.price,
        }));

        const firstStock = stockList[stockList.length - 1];
        const stockName = firstStock.companyName;
        const price = firstStock.price;

        const stockChartProps = {
          stockName,
          price,
          priceChangePercentage,
          priceData,
        };
        setCompanyNews(response.data.data.newsList.slice(-2));
        setStockChartInfo(stockChartProps);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }, []);

  const [stepsEnabled, setStepsEnabled] = useState(false);
  const [initialStep] = useState(0);
  const [tour] = useState({
    options: tourOptions,
    steps: tourSteps,
  });

  const onExit = () => {
    setStepsEnabled(false);
  };

  const handleHelp = () => {
    setStepsEnabled((prev) => !prev);
  };

  const handleBuyClick = () => {
    setIsBuyModalOpen(true);
  };
  const handleSellClick = () => {
    setIsSellModalOpen(true);
  };
  const handleBuyClose = () => {
    setIsBuyModalOpen(false);
  };
  const handleSellClose = () => {
    setIsSellModalOpen(false);
  };

  return (
    <React.Fragment>
      <Steps
        enabled={stepsEnabled}
        steps={tour.steps}
        initialStep={initialStep}
        onExit={onExit}
        options={tour.options}
      />
      <div className="p-2" />
      <div
        className="mt-12"
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#f6f6f6",
        }}
      >
        <div className="py-4" />
        <p className="font-bold text-3xl">{maskedCompanyName}</p>
        <div className="flex justify-end mr-4">
          <Icon
            icon="mdi:help-circle-outline"
            className="w-6 h-6 text-gray-400"
            onClick={handleHelp}
          />
        </div>

        {stockChartInfo ? (
          <StockChart
            stockInfo={stockChartInfo}
            maskedStockName={maskedCompanyName}
          />
        ) : (
          <div>로딩 중...</div>
        )}

        <div className="bg-bgblue py-1 pt-3 m-5 rounded-lg">
          <p className="font-bold text-2xl text-left ml-8">주요 뉴스</p>
          {companyNews.map((news, index) => (
            <StockNews key={index} news={news} />
          ))}
        </div>
        <div className="pb-4">
          <button
            onClick={handleBuyClick}
            className="border-2 border-red-300 w-32 font-bold bg-mainpink text-white text-xl"
            id="buy-btn"
          >
            살래요
          </button>
          <span className="m-5" />
          <button
            onClick={handleSellClick}
            className="border-2 border-blue-300 w-32 font-bold bg-mainblue text-white text-xl"
            id="sell-btn"
          >
            팔래요
          </button>
        </div>
        <div className="p-4" />
      </div>

      {isBuyModalOpen && (
        <Modal>
          <button
            className="bg-transparent relative inset-x-32"
            onClick={handleBuyClose}
          >
            <Icon
              icon="zondicons:close-outline"
              className="w-6 h-6 text-gray-600"
            />
          </button>
          <BuyStock
            companyName={maskedCompanyName}
            unmaskedName={companyName}
            price={stockChartInfo.price}
            onClose={handleBuyClose}
          />
        </Modal>
      )}

      {isSellModalOpen && (
        <Modal>
          <button
            className="bg-transparent relative inset-x-32"
            onClick={handleSellClose}
          >
            <Icon
              icon="zondicons:close-outline"
              className="w-6 h-6 text-gray-600"
            />
          </button>
          <SellStock
            companyName={maskedCompanyName}
            unmaskedName={companyName}
            price={stockChartInfo.price}
            onClose={handleSellClose}
          />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default StockDetail;
