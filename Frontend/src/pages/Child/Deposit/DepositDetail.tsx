import React from 'react';
import DepositList from '../../../components/Deposit/DepositList';
import { useLocation } from 'react-router-dom';

const DepositDetail: React.FC = () => {

    const now = new Date();
    
    const location = useLocation()
    const depositData = location.state
    //가입일
    const startdate = depositData.startDate
    //만기일
    const enddate = depositData.endDate
    //예금 남은 기간(밀리초)
    const distance = new Date(enddate).getTime() - now.getTime()
    //총 예금 기간(밀리초)
    const distance2 = new Date(enddate).getTime() - new Date(startdate).getTime()
    //예금 남은 일
    const maturitydate = Math.floor(distance / (1000 * 60 * 60 * 24));
    //총 예금 일
    const maturitydate2 = Math.floor(distance2 / (1000 * 60 * 60 * 24));
    //가입 중인 기간
    const maturitydate3 = maturitydate2 - maturitydate
    //현재까지 쌓인 이자
    const nowinterest = depositData.money * ((depositData.interest)/700 * maturitydate3)

    return (
        <div className='mt-20'>
        <div className="flex flex-col items-center justify-center">
            {/* <h2 className="fixed inset-x-0 top-10 z-50 left-0">자식 보유예금 상세</h2> */}
            {/* <p>xx정기예금</p> */}
            <div className='mt-20'>
                <div>현재 날짜: {`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`}</div>
                <div>가입일: {depositData.startDate}</div>
                <p className='m-4 text-2xl flex justify-center'>만기일까지 <span className='font-bold text-3xl'>{maturitydate+1}</span>일</p>
                <p className='m-4 mb-8 text-2xl flex justify-center'>지금까지 쌓인 이자 <span className='font-bold text-3xl'>{nowinterest.toFixed(0).toLocaleString()}</span>원</p>
                <p className='m-4 text-2xl'>만기 해지 시 </p>
                <p className='m-4 text-2xl flex justify-center'><span className='font-bold text-3xl'>{depositData.maturityPaymentAmount.toLocaleString()}</span>원을 받을 수 있어요!</p>
            </div>
            <div className='ml-4 mr-4 mt-8 w-[75%]'>
                <DepositList 
                depositName={depositData.depositName} depositMoney={depositData.money} maturity={depositData.endDate}
                >
                    
                </DepositList>
            </div>
        </div>
        </div>
    )
};

export default DepositDetail;