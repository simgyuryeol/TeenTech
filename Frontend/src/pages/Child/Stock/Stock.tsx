import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StockPortfolio from "../../../components/Stock/StockPortfolio";
import MyStock from "../../../components/Stock/MyStock";
import EmptyStock from "../../../components/Stock/EmptyStock";
import { Icon } from "@iconify/react/dist/iconify.js";
import useStockStatistics from "../../../hooks/useStockStatistics";
import Bot from "../Bot/Bot";

import "intro.js/introjs.css";
import { Steps } from "intro.js-react";
import {
  tourOptions,
  tourSteps,
} from "../../../components/Tutorial/StockTutorial";

const Stock: React.FC = () => {
  const navigator = useNavigate();
  const [myStocks, setMystocks] = useState([]);
  const { totalValue, totalGain, averageROR } = useStockStatistics(myStocks);

  const [stepsEnabled, setStepsEnabled] = useState(false);
  const [initialStep] = useState(0);
  const [tour] = useState({
    options: tourOptions,
    steps: tourSteps,
  });

  useEffect(() => {
    axios
      // .get(import.meta.env.VITE_BASE_URL + `${child_id}/investments`, {
      .get(import.meta.env.VITE_BASE_URL + "/api/v1/34/investments")
      .then((response) => {
        const initialData = response.data.data;

        const fetchDataForStock = async (stock) => {
          try {
            const additionalResponse = await axios.post(
              import.meta.env.VITE_BASE_URL + "/api/v1/34/investments/detail",
              {
                companyName: stock.companyName,
              }
            );
            const additionalData = additionalResponse.data.data.stockList.slice(
              -1
            );
            stock.investment = stock.averagePrice * stock.amount;
            stock.value = additionalData[0].price * stock.amount;
            stock.gain =
              (additionalData[0].price - stock.averagePrice) * stock.amount;
            stock.ror =
              ((additionalData[0].price - stock.averagePrice) /
                stock.averagePrice) *
              100;
          } catch (error) {
            console.error(
              `Error fetching data for stock ${stock.companyName}:`,
              error
            );
          }
        };
        const fetchPromises = initialData.map(fetchDataForStock);

        Promise.all(fetchPromises)
          .then(() => {
            setMystocks(initialData);
          })
          .catch((error) => {
            console.error("Error fetching additional data for stocks:", error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onExit = () => {
    setStepsEnabled(false);
  };

  const handleHelp = () => {
    setStepsEnabled((prev) => !prev);
  };

  const handleClick = () => {
    navigator("/StockMarket");
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

      <div className="mt-16">
        {/* 챗봇 */}
        <div style={{ position: "fixed", bottom: 0, right: 0, zIndex: 9999 }}>
          <div className="flex items-end">
            <div className="bg-sky-200 rounded-lg drop-shadow-md p-2 mb-3">
              질문해줘
            </div>
            <Bot />
          </div>
        </div>
        <div className="p-3" />
        <div className="flex justify-end mr-4">
          <Icon
            icon="mdi:help-circle-outline"
            className="w-6 h-6 text-gray-400"
            onClick={handleHelp}
          />
        </div>

        <StockPortfolio
          totalValue={totalValue}
          totalGain={totalGain}
          averageROR={averageROR}
        />

        <div className="bg-bgblue p-2 m-5 rounded-xl">
          <p className="font-bold text-2xl text-left mt-4 mx-8">
            나의 주식 살펴보기
          </p>
          {myStocks.length ? (
            myStocks.map((stock, index) => (
              <MyStock key={index} stock={stock} />
            ))
          ) : (
            <EmptyStock />
          )}
        </div>

        <button
          onClick={handleClick}
          id="stock-market"
          className="bg-indigo-200 mt-4"
        >
          주식시장 둘러보기
        </button>
      </div>
    </React.Fragment>
  );
};

export default Stock;
