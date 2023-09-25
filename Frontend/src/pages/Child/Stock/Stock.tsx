import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StockPortfolio from "../../../components/Stock/StockPortfolio";
import MyStock from "../../../components/Stock/MyStock";
import EmptyStock from "../../../components/Stock/EmptyStock";
import { Icon } from "@iconify/react/dist/iconify.js";

import "intro.js/introjs.css";
import { Steps } from "intro.js-react";
import {
  tourOptions,
  tourSteps,
} from "../../../components/Tutorial/StockTutorial";

interface Stock {
  koName: string;
  enName: string;
  investment: number;
  value: number;
  gain: number;
  ror: number;
}

const Stock: React.FC = () => {
  const navigator = useNavigate();

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

  const handleClick = () => {
    navigator("/StockMarket");
  };

  const sampleData: Stock[] = [
    {
      koName: "삼성전자",
      enName: "samsung",
      investment: 1000,
      value: 900,
      gain: -100,
      ror: -10.0,
    },
    {
      koName: "카카오",
      enName: "kakao",
      investment: 1000,
      value: 1100,
      gain: 100,
      ror: 10.0,
    },
  ];

  return (
    <React.Fragment>
      <Steps
        enabled={stepsEnabled}
        steps={tour.steps}
        initialStep={initialStep}
        onExit={onExit}
        options={tour.options}
      />

      <div className="mt-20">
        <div className="flex justify-end mr-4">
          <Icon
            icon="mdi:help-circle-outline"
            className="w-6 h-6 text-gray-400"
            onClick={handleHelp}
          />
        </div>

        <StockPortfolio />

        <div className="bg-bgblue p-2 m-5 rounded-xl">
          <p className="font-bold text-2xl text-left mt-4 mx-8">
            나의 주식 살펴보기
          </p>
          {sampleData.length ? (
            sampleData.map((stock, index) => (
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
