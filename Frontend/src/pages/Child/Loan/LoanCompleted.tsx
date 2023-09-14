import React from 'react';
import LoanCompo from '../../../components/Loan/LoanCompo';
import LoanDetail from '../../../components/Loan/LoanDetail';
import LoanReview from '../../../components/Loan/LoanReview';
import Loanrepayment from '../../../components/Loan/Loanrepayment';


const LoanCompleted: React.FC = () => {
    return (
        <div className='mt-20'>
        <h2 className="fixed inset-x-0 top-10 z-50 left-0">자식 지난 대출</h2>
        <LoanDetail></LoanDetail>
        <LoanReview></LoanReview>
        </div>
    )
};

export default LoanCompleted;