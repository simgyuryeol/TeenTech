import React from 'react';
import Credit from '../../../components/Credit';
import LoanStatus from '../../../components/Loan/LoanStatus';
import { Link } from 'react-router-dom';

const Loan: React.FC = () => {
    return (
        <div className='mt-20'>
            <h2 className="fixed inset-x-0 top-10 z-50 left-0">자식 대출 페이지</h2>
            <Credit></Credit>
            <div className='flex flex-col justify-center border border-2'>
            <LoanStatus></LoanStatus>
            <button className='font-bold p-2 pt-1 pb-1 ml-6 mr-6' style={{color:'#363636', backgroundColor:'#ABC3D0'}}>대출 신청</button>
            </div>
            <p className='text-xs'>지난 대출 보기</p>
            <Link to='/LoanCompleted'>
            <hr className='border-1' style={{borderColor: '#ABD0CE'}}/>
            </Link>
        </div>
    )
};

export default Loan;