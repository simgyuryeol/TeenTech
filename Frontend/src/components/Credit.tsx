import React, { ReactNode } from 'react';
import GaugeChart from "react-gauge-chart";

interface CreditProps {
    children: ReactNode;
  }

const Credit: React.FC<CreditProps> = (props) => {
    const credit = 5
    const creditNumber = (credit >= 1 && credit <= 10) ? (0.05 + (credit - 1) * 0.1) : 0.95;
    const chartStyle = {
        height: '90',
        width: '80%',
      }
    return (
    <div className=" flex flex-col rounded-xl mr-6 ml-6 bg-white" style={{borderColor: '#ABD0CE'}}>
        <div className='flex'>
            <div className='flex flex-col'>
            <h2 className="text-xl">신용 정보</h2>
            <GaugeChart id="gauge-chart1" 
                nrOfLevels={10}
                percent={creditNumber}
                textColor={'#000000'}
                hideText={true}
                style={chartStyle} 
                />
            </div>
            <div className="flex flex-col justify-center m-4 mt-6">
                <h2 className='text-2xl font-bold'>신용등급: {credit}</h2>
                <h2 className='text-xl mb-1'>알바횟수: 2/3</h2>
            </div>
        </div>
        <div className=''>
            {props.children}
        </div>
    </div>
    )
};

export default Credit;
