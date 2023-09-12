import React from 'react';
import Credit from '../../../components/Credit';
import LoanStatus from '../../../components/Loan/LoanStatus';
import { Link } from 'react-router-dom';
import LoanList from '../../../components/Loan/LoanList';

const Loan: React.FC = () => {
    return (
        <div className='mt-20'>
            <h2 className="fixed inset-x-0 top-10 z-50 left-0">자식 대출 페이지</h2>
            <Credit></Credit>
            <div className='flex flex-col justify-center'>
                <LoanStatus>
                    <div className='flex justify-end'>
                        <button className='font-bold p-2 pt-1 pb-1 ml-6 mr-6 mt-2 mb-2' style={{color:'#363636', backgroundColor:'#ABC3D0'}}>대출 신청</button>
                    </div>
                </LoanStatus>
            </div>
            <Link to='/LoanCompleted'>
            <p className='text-xs text-end mr-10 text-black'>지난 대출 보기</p>
            </Link>
            <hr className='border-1' style={{borderColor: '#ABD0CE'}}/>
            <div>
                <p className='m-4 text-lg'>대출 리스트</p>
            </div>
            <div>
                <LoanList>
                    
                </LoanList>
                <LoanList>

                </LoanList>
                <LoanList>

                </LoanList>
            </div>
        </div>
    )
};

export default Loan;