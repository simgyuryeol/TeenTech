import React from 'react';
import DepositList from '../../../components/DepositList';

const DepositDetail: React.FC = () => {
    return (
        <div>
        <h2 className="fixed inset-x-0 top-10 z-50 left-0">자식 보유예금 상세</h2>
        <p>xx정기예금</p>
        <p>만기일까지 xx일</p>
        <p>지금까지 쌓인 이자 xx원</p>
        <p>만기 해지 시 xxx원을 받을 수 있어요!</p>
        <div className='ml-4 mr-4 mt-8'>
        <DepositList></DepositList>
        </div>
        </div>
    )
};

export default DepositDetail;