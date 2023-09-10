import React from 'react';
import GaugeChart from 'react-gauge-chart'

const Credit: React.FC = () => {
    const credit = 1
    const creditNumber = (credit >= 1 && credit <= 10) ? (0.05 + (credit - 1) * 0.1) : 0.95;
    return (
        <div className="border">
        <h2>신용 정보</h2>
        <GaugeChart id="gauge-chart1" 
  nrOfLevels={10}
  percent={creditNumber}
  textColor={'#000000'}
  hideText={true}
/>
        <h2>신용등급: {credit}</h2>
        <h2>알바횟수: </h2>
        </div>
    )
};

export default Credit;