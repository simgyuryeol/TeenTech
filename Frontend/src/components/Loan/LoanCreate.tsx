import React, { useState, ReactNode } from 'react';

interface LoanCreateProps {
    children: ReactNode;
  }

const LoanCreate: React.FC<LoanCreateProps> = (props) => {
    const interestrate = 2;
    // const LoanName= '세진이 생일 선물'
    // const LoanMoney = 100000;
    // const maturity = '2023.10.04'
    // const reason = ''
    // const repayment = ''
    const [loanName, setLoanName]= useState('')
    const [loanMoney, setLoanmoney] = useState('');
    const [loanDate, setLoandate] = useState('');
    const [repayment, setRepayment] = useState('');
    const [reason, setReason] = useState('');
    const loanLimit = 100000;


    return (
        <div className="border rounded-md shadow-md w-[90%] ml-[5%]">
           <div className='mt-2'>
              <p className='text-2xl font-bold'>대출 신청</p>
              <p className='flex text-xs mt-4 ml-[5%] w-[100%]'>대출 가능 금액: {loanLimit.toLocaleString()}원</p>
           </div>
            <div>
                <div className='flex'>
                    <label htmlFor='name' className='flex ml-[5%] w-[100%] text-lg'>대출 이름</label>
                    <p className='w-[30%] text-xs'>이자율: {interestrate}%</p>
                </div>
                <input className='border rounded-md w-[90%] p-3' type='text' id='name' placeholder='' value={loanName} onChange={e=> setLoanName(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor='money' className='flex ml-[5%] w-[100%] text-lg'>대출 금액</label>
                <input className='border rounded-md w-[90%] p-3' type='number' id='money' placeholder='최소 금액 5,000원' value={loanMoney} onChange={e=> setLoanmoney(e.target.value)} required/>     
            </div>
            <div>
                <label htmlFor='date' className='flex ml-[5%] w-[100%] text-lg'>대출 기간</label>
                <input className='border rounded-md w-[90%] p-3' type='date' id='date' placeholder='' value={loanDate} onChange={e=> setLoandate(e.target.value)} required/>    
            </div>
            <div>
            <div className='flex flex-col w-[100%]'>
              <label htmlFor="repayment" className='flex ml-[5%] w-[100%] text-lg'>상환 방법</label>
                  <div className="form-repayment flex justify-around border rounded-md ml-[5%] mr-[5%] bg-white">
                    <div className="form-repayment p-3">
                      <label className="inputlabel" htmlFor="repayment1">
                        나눠서 갚을게요
                      </label>
                      <input
                        type="radio"
                        id="repayment1"
                        name="repayment"
                        value="분할"
                        onChange={e => setRepayment(e.target.value)}
                        ></input>
                    </div>
                    <div className="form-repayment p-3">
                      <label className="inputlabel" htmlFor="repayment2">
                        한번에 갚을게요
                      </label>
                      <input
                        type="radio"
                        id="repayment2"
                        name="repayment"
                        value="일시"
                        onChange={e => setRepayment(e.target.value)}
                        ></input>
                    </div>
                  </div>
                </div>
            </div>
            <div className='mb-2'>
                <label htmlFor='reason' className='flex ml-[5%] w-[100%] text-lg'>대출 사유</label>
                {/* <input className='border rounded-md w-[90%] p-10 break-words' type='textarea' id='reason' placeholder='' value={reason} onChange={e=> setReason(e.target.value)} required/> */}
                <textarea className="border rounded-md w-[90%] p-4 pb-10 break-words" id='reason' placeholder='' value={reason} onChange={e=> setReason(e.target.value)} required></textarea>
            </div>
            <div className='flex justify-around mb-4'>
              <div className='border-2 border-black rounded-md'>
                  <p className='p-10 pt-1 pb-1'>취소</p>
              </div>
              <div className='border-2 border-black rounded-md'>
                  <p className='p-10 pt-1 pb-1'>신청</p>
              </div>
            </div>
        </div>
    )
};

export default LoanCreate;