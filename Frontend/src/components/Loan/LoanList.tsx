import React, { ReactNode } from 'react';

interface LoanListProps {
    children: ReactNode;
  }

const LoanList: React.FC<LoanListProps> = (props) => {
    const LoanName= '세진이 생일 선물'
    const LoanMoney = 100000;
    // const depositMoney2 = depositMoney >= 10000 ? depositMoney / 10000 +'만' : depositMoney;
    // const interestrate = '2'
    const maturity = '2023.10.04'

    return (
        <div>
        <div className="border border-2 rounded-xl pt-2 mr-6 ml-6 bg-white" style={{borderColor: '#ABD0CE'}}>
            <div className='flex'>
                <div className=' w-[100%]'>
                    <div>
                        <div className='text-sm'>대출 이름</div>
                        <div className='text-lg'>{LoanName}</div>
                    </div>
                    <div>
                        <div className='text-sm'>남은 상환액</div>
                        <div className='text-2xl text-red-500'>{LoanMoney.toLocaleString()}원</div>
                    </div>
                </div>
                <div className='flex justify-center items-center w-[100%]'>
                    <p className='text-5xl text-red-500 font-bold'>D-4</p>
                </div>
            </div>
            <div className='flex justify-end'>
                <p className='border-2 rounded-md pl-2 pr-2 mb-1 bg-gray-300'>더보기</p>
                <p className='border-2 rounded-md pl-2 pr-2 ml-4 mr-4 mb-1 bg-gray-300'>상환하기</p>
            </div>
        </div>
        <br></br>
        </div>
    )
};

export default LoanList;