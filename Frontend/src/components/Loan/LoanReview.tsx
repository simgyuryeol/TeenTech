import React from 'react';
import LoanCompo from './LoanCompo';

const LoanReview: React.FC = () => {
  return (
    <LoanCompo children='' children2={
    <div className='flex justify-around mb-4'>
        <div className='border-2 border-blue-500 rounded-md'>
            <p className='p-10 pt-1 pb-1'>수락</p>
        </div>
        <div className='border-2 border-red-500 rounded-md'>
            <p className='p-10 pt-1 pb-1'>거절</p>
        </div>
    </div>
    }/>
  );
};

export default LoanReview;