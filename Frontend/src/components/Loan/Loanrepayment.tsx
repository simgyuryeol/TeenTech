import React, { useState, ReactNode } from 'react';

interface LoanrepaymentProps {
    children: ReactNode;
  }

const Loanrepayment: React.FC<LoanrepaymentProps> = (props) => {
    const haveMoney = 100000;
    // const depositMoney2 = depositMoney >= 10000 ? depositMoney / 10000 +'만' : depositMoney;
    // const interestrate = '2'
    const [loanMoney, setLoanmoney] = useState('');

    return (
        <div>
        <div className="border border-2 rounded-xl pt-2 mr-6 ml-6 bg-white" style={{borderColor: '#ABD0CE'}}>
            <div>
                <p className='flex ml-[5%] w-[100%] text-lg'>상환 가능한 금액</p>
                <p className='flex justify-end font-bold text-2xl ml-[5%] w-[90%] bg-white'>{haveMoney.toLocaleString()}원</p> 
            </div>
            <div>
                <label htmlFor='repaymoney' className='flex ml-[5%] w-[100%] text-sm'>상환액</label>
                <input className='border rounded-md w-[90%] p-3' type='number' id='repaymoney' placeholder='최소 금액 5,000원' value={loanMoney} onChange={e=> setLoanmoney(e.target.value)} required/>     
            </div>
            <div className='flex justify-end'>
                <p className='border-2 rounded-md pl-2 pr-2 mt-2 ml-4 mr-4 mb-2 bg-gray-300'>상환하기</p>
            </div>
        </div>
        <br></br>
        </div>
    )
};

export default Loanrepayment;