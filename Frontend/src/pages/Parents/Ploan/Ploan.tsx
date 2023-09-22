import React from 'react';
import LoanStatus from '../../../components/Loan/LoanStatus';
import LoanReview from '../../../components/Loan/LoanReview';
import LoanList from '../../../components/Loan/LoanList';

const Ploan: React.FC = () => {
    return (
        <div>
            <h2>부모 대출 페이지</h2>
            <div className='mt-2 mb-2 flex flex-col'>
                <LoanStatus>
                    
                </LoanStatus>
                <p className='mt-2 mr-6 text-xs flex justify-end'>지난 대출 보기</p>
            </div>
            <hr className='border-2'></hr>
            <div>
                <p>대출 신청서</p>
                <LoanReview></LoanReview>
            </div>
            <hr className='border-2'></hr>
            <div>
                <p>대출 리스트</p>
                <LoanList children={undefined} children2={undefined}></LoanList>
            </div>
        </div>
    )
};

export default Ploan;