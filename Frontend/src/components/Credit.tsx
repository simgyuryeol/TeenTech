import React from "react";
import GaugeChart from "react-gauge-chart";

const Credit: React.FC = () => {
  const credit = 5;
  const creditNumber =
    credit >= 1 && credit <= 10 ? 0.05 + (credit - 1) * 0.1 : 0.95;
  return (
    <div className="border rounded-md mr-6 ml-6 mb-4">
      <h2>신용 정보</h2>
      <GaugeChart
        id="gauge-chart1"
        nrOfLevels={10}
        percent={creditNumber}
        textColor={"#000000"}
        hideText={true}
      />
      <h2 className="text-2xl font-bold">신용등급: {credit}</h2>
      <h2 className="text-xl">알바횟수: 2/3</h2>
    </div>
  );
};

export default Credit;
