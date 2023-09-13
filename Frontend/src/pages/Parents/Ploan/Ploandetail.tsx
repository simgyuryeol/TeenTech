import React from 'react';
import LoanDetail from '../../../components/Loan/LoanDetail';

const Ploandetail: React.FC = () => {
    return (
        <div>
            <h2>부모 대출 상세</h2>
            <LoanDetail></LoanDetail>
            <LoanDetail></LoanDetail>
        </div>
    )
};

export default Ploandetail;