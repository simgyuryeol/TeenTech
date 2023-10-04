import React, { ReactNode } from 'react';

interface DepositListProps {
    children: ReactNode;
    depositName: string;
    depositMoney: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    maturity: any;
    interestrate: number;
  }

const DepositList: React.FC<DepositListProps> = (props) => {
    // const depositName= '뀨뀨 정기 예금'
    // const depositMoney = 100000;
    const depositMoney2 = props.depositMoney >= 10000 ? props.depositMoney / 10000 +'만' : props.depositMoney;
    // const interestrate = '2'
    // const maturity = '2023.10.04'

    return (

        <div className="rounded-xl shadow-md bg-white" style={{borderColor: '#ABD0CE'}}>
        <h2 className='mt-2 mb-1 pt-1 font-bold flex justify-center text-xl'>{props.depositName}</h2>
        <div className='flex justify-around'>
        <h2 className='flex items-center m-1'>예치금:</h2>
        <div className='flex flex-col items-end'>
            <h2 className='flex'>{props.depositMoney.toLocaleString()}원</h2>
            <p className='flex text-xs'>({depositMoney2}원)</p>
        </div>
        </div>
        <div className='flex justify-around'>
        <h2 className='flex mt-1 mb-1 mr-1'>적용금리: </h2>
        <h2 className='flex items-end mb-1 mt-1 ml-1'>월 {props.interestrate}%</h2>
        </div>
        <div className='flex justify-around'>
        <h2 className='flex mt-1 mb-1 ml-2'>만기일: </h2>
        <h2 className='flex m-1 mb-2'>{props.maturity}</h2>
        </div>
        {props.children}
        </div>
    )
};

export default DepositList;