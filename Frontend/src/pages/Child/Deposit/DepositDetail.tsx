import React from 'react';
import DepositList from '../../../components/Deposit/DepositList';

const DepositDetail: React.FC = () => {
    const maturitydate = 100;
    const interest = 110;
    const total = 100110;
    return (
        <div className='mt-20'>
        <div className="flex flex-col items-center justify-center">
            {/* <h2 className="fixed inset-x-0 top-10 z-50 left-0">자식 보유예금 상세</h2> */}
            {/* <p>xx정기예금</p> */}
            <div className='mt-20'>
                <p className='m-4 text-2xl flex justify-center'>만기일까지 <span className='font-bold text-3xl'>{maturitydate}</span>일</p>
                <p className='m-4 mb-8 text-2xl flex justify-center'>지금까지 쌓인 이자 <span className='font-bold text-3xl'>{interest.toLocaleString()}</span>원</p>
                <p className='m-4 text-2xl'>만기 해지 시 </p>
                <p className='m-4 text-2xl flex justify-center'><span className='font-bold text-3xl'>{total.toLocaleString()}</span>원을 받을 수 있어요!</p>
            </div>
            <div className='ml-4 mr-4 mt-8 w-[75%]'>
                <DepositList>
                    
                </DepositList>
            </div>
        </div>
        </div>
    )
};

export default DepositDetail;