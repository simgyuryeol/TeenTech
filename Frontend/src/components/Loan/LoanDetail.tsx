import React from 'react';
import LoanCompoAcco from './LoanCompoAcco';

const LoanDetail: React.FC = () => {
  return (
    <LoanCompoAcco children={
        <div className='flex justify-between mt-4'>
            <div className='border-2 border-green-500 rounded-md ml-5'>
                <p className='p-6 pt-1 pb-1'>상환 완료</p>
            </div>
            <div className='border-2 border-grey-500 rounded-md mr-5'>
                <p className='p-10 pt-1 pb-1'>삭제</p>
            </div>
        </div>
} children2={''}/>
  );
};

export default LoanDetail;
