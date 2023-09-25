import React, { useState, ReactNode } from 'react';
import Modal from '../Common/Modal';

interface LoanCompoProps {
    children: ReactNode;
    children2: ReactNode;
    closeModal: (value: any) => void;
  }

const LoanCompo: React.FC<LoanCompoProps> = (props) => {
    const interestrate = 2;
    const loanName= '세진이 생일 선물'
    const loanMoney = 100000;
    const maturity = '2023.10.04'
    const repayment = '나눠서 갚을게요'
    const reason = '우리 세진이 생일 선물 사줘야합니다 존경하는 부모님'

    return (
        <Modal>
        <div className="">
            {props.children}
            <div className='flex flex-col mt-4'>
                <div className='flex'>
                    <p className='flex ml-[5%] w-[100%] text-lg'>대출 이름</p>
                    <p className='w-[30%] text-xs'>이자율: {interestrate}%</p>
                </div>
                <p className='ml-[5%] border rounded-md w-[90%] p-3' style={{backgroundColor:'#EBF0F3'}}>{loanName}</p> 
            </div>
            <div>
                <p className='flex ml-[5%] w-[100%] text-lg'>대출 금액</p>
                <p className='ml-[5%] border rounded-md w-[90%] p-3' style={{backgroundColor:'#EBF0F3'}}>{loanMoney}</p> 
            </div>
            <div>
                <p className='flex ml-[5%] w-[100%] text-lg'>대출 기간</p>
                <p className='ml-[5%] border rounded-md w-[90%] p-3' style={{backgroundColor:'#EBF0F3'}}>{maturity}</p> 
            </div>
            <div>
            {/* <div className='flex flex-col w-[100%]'>
              <p className='flex ml-[5%] w-[100%] text-lg'>상환 방법</p>
              <p className='ml-[5%] border rounded-md w-[90%] p-3' style={{backgroundColor:'#EBF0F3'}}>{repayment}</p> 
            </div> */}
            </div>
            <div className='mb-4'>
                <p className='flex ml-[5%] w-[100%] text-lg'>대출 사유</p>
                <p className="ml-[5%] border rounded-md w-[90%] p-4 pb-10 break-words" style={{backgroundColor:'#EBF0F3'}}>{reason}</p>
            </div>
            <div className='flex justify-around mb-4'>
              <div className='border-2 border-black rounded-md '>
                <p onClick={props.closeModal} className='p-10 pt-1 pb-1'>취소</p>
              </div>
                {props.children2}
            </div>
        </div>
        </Modal>
    )
};

export default LoanCompo;