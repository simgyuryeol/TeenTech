import React, { ReactNode, useEffect, useState } from 'react';
import GaugeChart from "react-gauge-chart";
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CreditAtom } from '../recoil/creditAtom';
import { stateAtom } from '../recoil/stateAtom';
import { childIdAtom } from '../recoil/childIdAtom';

interface CreditProps {
  children: ReactNode;
}

const base_URL = import.meta.env.VITE_SERVER_URL;

const accessToken = window.localStorage.getItem('accessToken')

const Credit: React.FC<CreditProps> = (props) => {

    const state = useRecoilValue(stateAtom).id;
    const childId = useRecoilValue(childIdAtom).id;
    const SetCredits = useSetRecoilState(CreditAtom);

  useEffect(() => {
    const Creditdata = () => {
        if(state === 0){
            axios
            .get(base_URL + `/api/v1/users/credit-and-interests/`,{
                headers: {
                  Authorization: `Bearer ${accessToken}`,
               }
              })
            .then(response => {
                console.log(response.data);
                SetCredit(response.data.data.creditRating)
                SetCredits((prevCredit) => ({
                    ...prevCredit,
                    credit: response.data.data.creditRating,
                    depositinterest: response.data.data.depositInterestRate,
                    loaninterest: response.data.data.loanInterestRate,
                  }));
                // const depositid = response.data
                // navigate(`/DepositJoinSuccess/${depositid}`);
            })
            .catch(error => {
                console.log(error);
            });
        }
        else{
            axios
            .get(base_URL + `/api/v1/users/credit-and-interests/${childId}`, {
                // userId: window.localStorage.getItem('userId'),
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                 }
            })
            .then(response => {
                console.log(response.data);
                SetCredit(response.data.data.creditRating)
                setAlba(response.data.data.albaSuccessStreak)
                SetCredits((prevCredit) => ({
                    ...prevCredit,
                    credit: response.data.data.creditRating,
                    depositinterest: response.data.data.depositInterestRate,
                    loaninterest: response.data.data.loanInterestRate,
                  }));
            })
            .catch(error => {
                console.log(error);
            });
        }
        };

    Creditdata(); // Creditdata 함수 호출
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const [credit, SetCredit] = useState(1)
  const [alba, setAlba] = useState(0)
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
