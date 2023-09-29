import React, { ReactNode, useEffect } from 'react';
import GaugeChart from "react-gauge-chart";
import axios from 'axios';

interface CreditProps {
  children: ReactNode;
}

const base_URL = import.meta.env.VITE_SERVER_URL;

const Credit: React.FC<CreditProps> = (props) => {

  useEffect(() => {
    const Creditdata = () => {
      axios
        .get(base_URL + `/api/v1/users/credit-and-interests`, {
          // userId: window.localStorage.getItem('userId'),
        })
        .then(response => {
          console.log(response.data);
          // const depositid = response.data
          // navigate(`/DepositJoinSuccess/${depositid}`);
        })
        .catch(error => {
          console.log(error);
        });
    };

    Creditdata(); // Creditdata 함수 호출
  }, []); 

  const credit = 5
  const alba = 2
  const creditNumber = (credit >= 1 && credit <= 10) ? (0.05 + (credit - 1) * 	0.1) : 0.95; 
  const chartStyle = {
	height: '90',
	width: '80%',
	};

	return (
		<div className="flex flex-col rounded-xl mr-6 ml-6 bg-white shadow-md" style={{borderColor: '#ABD0CE'}}>
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
					<h2 className='text-xl mb-1'>알바횟수: {alba}/3</h2>
				</div>
	</div>
	<div>{props.children}</div>
	</div>
   );
};

export default Credit;
