import React from 'react';
import DepositList from '../../components/Deposit/DepositList';

const Pdeposit: React.FC = () => {
    return (
        <div>
            
        <h2>부모 예금 페이지</h2>
        <DepositList></DepositList>
        <DepositList></DepositList>
        </div>
    )
};

export default Pdeposit;