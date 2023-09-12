import React, { useState, ReactNode } from 'react';

interface LoanCompoProps {
    children: ReactNode;
    children2: ReactNode;
  }

const LoanCompo: React.FC<LoanCompoProps> = (props) => {
    const interestrate = 2;
    const loanName= '세진이 생일 선물'
    const loanMoney = 100000;
    const maturity = '2023.10.04'
    const repayment = '나눠서 갚을게요'
    const reason = '우리 세진이 생일 선물 사줘야합니다 존경하는 부모님'

    return (
        <div className="border rounded-md shadow-md w-[90%] ml-[5%]">
            {props.children}
            <div className='flex flex-col mt-4'>
                <div className='flex'>
                    <p className='flex ml-[5%] w-[100%] text-lg'>대출 이름</p>
                    <p className='w-[30%] text-xs'>이자율: {interestrate}%</p>
                </div>
                <p className='ml-[5%] border rounded-md w-[90%] p-3 bg-white'>{loanName}</p> 
            </div>
            <div>
                <p className='flex ml-[5%] w-[100%] text-lg'>대출 금액</p>
                <p className='ml-[5%] border rounded-md w-[90%] p-3 bg-white'>{loanMoney}</p> 
            </div>
            <div>
                <p className='flex ml-[5%] w-[100%] text-lg'>대출 기간</p>
                <p className='ml-[5%] border rounded-md w-[90%] p-3 bg-white'>{maturity}</p> 
            </div>
            <div>
            <div className='flex flex-col w-[100%]'>
              <p className='flex ml-[5%] w-[100%] text-lg'>상환 방법</p>
              <p className='ml-[5%] border rounded-md w-[90%] p-3 bg-white'>{repayment}</p> 
            </div>
            </div>
            <div className='mb-4'>
                <p className='flex ml-[5%] w-[100%] text-lg'>대출 사유</p>
                <p className="ml-[5%] border rounded-md w-[90%] p-4 pb-10 break-words bg-white">{reason}</p>
            </div>
            {props.children2}
        </div>
    )
};

export default LoanCompo;