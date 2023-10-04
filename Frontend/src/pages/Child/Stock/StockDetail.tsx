import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "../../../components/Common/Modal";
import StockChart from "../../../components/Stock/StockChart";
import StockNews from "../../../components/Stock/StockNews";
import BuyStock from "../../../components/Stock/BuyStock";
import SellStock from "../../../components/Stock/SellStock";
import { Icon } from "@iconify/react/dist/iconify.js";
import Bot from "../Bot/Bot";

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

  useEffect(() => {
    axios
      // .get(import.meta.env.VITE_BASE_URL + `/api/v1/${child_id}/investments`, {
      .post(import.meta.env.VITE_BASE_URL + "/api/v1/34/investments/detail", {
        companyName: companyName,
      })
      .then((response) => {
        const stockList = response.data.data.stockList;
        const slicedStockList = stockList.slice(-2);

        const currentStock = slicedStockList[1];
        const prevStock = slicedStockList[0];

        const priceChangePercentage =
          ((currentStock.price - prevStock.price) / prevStock.price) * 100;

        const priceData = stockList.map((stock) => ({
          x: stock.stockDate,
          y: stock.price,
        }));

        const firstStock = stockList[0];
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

      <div className="mt-12">
        {/* 챗봇 */}
        <div style={{ position: "fixed", bottom: 0, right: 0, zIndex: 9999 }}>
          <div className="flex items-end">
            <div className="bg-sky-200 rounded-lg drop-shadow-md p-2 mb-3">
              질문해줘
            </div>
            <Bot />
          </div>
        </div>
        <div className="py-4" />
        <p className="font-bold text-3xl">{companyName}</p>
        <div className="flex justify-end mr-4">
          <Icon
            icon="mdi:help-circle-outline"
            className="w-6 h-6 text-gray-400"
            onClick={handleHelp}
          />
        </div>

        {stockChartInfo ? (
          <StockChart stockInfo={stockChartInfo} />
        ) : (
          <div>로딩 중...</div>
        )}

        <p className="font-bold text-2xl text-left ml-8">주요 뉴스</p>
        {companyNews.map((news, index) => (
          <StockNews key={index} news={news} />
        ))}

        <button
          onClick={handleBuyClick}
          className="border-2 border-red-300 w-32 font-bold"
          id="buy-btn"
        >
          살래요
        </button>
        <span className="m-5" />
        <button
          onClick={handleSellClick}
          className="border-2 border-blue-300 w-32 font-bold"
          id="sell-btn"
        >
          팔래요
        </button>
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
            companyName={companyName}
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
            companyName={companyName}
            price={stockChartInfo.price}
            onClose={handleSellClose}
          />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default StockDetail;
