import React from 'react';

const DepositList: React.FC = () => {
    return (
        <div className="border rounded-md shadow-md">
        <h2>--정기예금</h2>
        <div className='flex justify-around'>
        <h2>예치금:</h2>
        <h2>100,000원</h2>
        </div>
        <div className='flex justify-around'>
        <h2>적용금리: </h2>
        <h2>월 2%</h2>
        </div>
        <div className='flex justify-around'>
        <h2>만기일: </h2>
        <h2>2023.10.04</h2>
        </div>
        </div>
    )
};

export default DepositList;