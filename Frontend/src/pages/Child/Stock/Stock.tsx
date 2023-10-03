import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StockPortfolio from "../../../components/Stock/StockPortfolio";
import MyStock from "../../../components/Stock/MyStock";
import EmptyStock from "../../../components/Stock/EmptyStock";
import { Icon } from "@iconify/react/dist/iconify.js";
import useStockStatistics from "../../../hooks/useStockStatistics";

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
        console.log(response.data);
        const initialData = response.data.data;

        const fetchDataForStock = async (stock) => {
          try {
            const additionalResponse = await axios.post(
              import.meta.env.VITE_BASE_URL +
                "34/investments/detail", {
                  companyName: stock.companyName
                }
            );
            const additionalData = additionalResponse.data.data.stockList.slice(-1);
            stock.investment = stock.averagePrice * stock.amount
            stock.value = additionalData.price * stock.amount
            stock.gain = (stock.price - stock.averagePrice) * stock.amount
            stock.ror = ((additionalData.price - stock.averagePrice) / stock.averagePrice) * 100;
          } catch (error) {
            console.error(`Error fetching data for stock ${stock.id}:`, error);
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
        <div className="p-3" />
        <div className="flex justify-end mr-4">
          <Icon
            icon="mdi:help-circle-outline"
            className="w-6 h-6 text-gray-400"
            onClick={handleHelp}
          />
        </div>
        
        <StockPortfolio totalValue={totalValue} totalGain={totalGain} averageROR={averageROR} />

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

          <MyStock
            stock={{
              companyName: "삼성전자",
              averagePrice: 1000,
              amount: 1,
              investment: 1000,
              value: 900,
              gain: -100,
              ror: -10.0,
            }}
          />
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
