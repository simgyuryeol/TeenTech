import React, { useState, ReactNode } from 'react';
import Modal from '../Common/Modal';

interface LoanrepaymentProps {
    children: ReactNode;
    closeModal: (value: any) => void;
  }

const Loanrepayment: React.FC<LoanrepaymentProps> = (props) => {
    const haveMoney = 100000;
    // const depositMoney2 = depositMoney >= 10000 ? depositMoney / 10000 +'만' : depositMoney;
    // const interestrate = '2'
    const [loanMoney, setLoanmoney] = useState('');

    return (
        <div className=''>
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30"></div>
            <Modal>
            <div className=''>
            <div className="">
                <div>
                    <p className='flex w-[100%] text-lg'>상환 가능한 금액</p>
                    <p className='flex justify-end font-bold text-2xl w-[100%] bg-white'>{haveMoney.toLocaleString()}원</p> 
                </div>
                <div>
                    <label htmlFor='repaymoney' className='flex w-[100%] text-sm'>상환액</label>
                    <input className='border rounded-md w-[100%] p-3' type='number' id='repaymoney' placeholder='최소 금액 5,000원' value={loanMoney} onChange={e=> setLoanmoney(e.target.value)} required/>     
                </div>
                <div className='flex justify-between'>
                    <div className='flex'>
                        <p onClick={props.closeModal} className='border-2 rounded-md mt-2 pl-6 pr-6 bg-gray-300'>취소</p>
                    </div>
                    <div className='flex justify-end'>
                        <p className='border-2 rounded-md pl-2 pr-2 mt-2 ml-4 bg-gray-300'>상환하기</p>
                    </div>
                </div>
            </div>
            </div>
        </Modal>
        </div>
        // <Modal>
        // <div>
        // <div className="border border-2 rounded-xl pt-2 mr-6 ml-6 bg-white" style={{borderColor: '#ABD0CE'}}>
        //     <div>
        //         <p className='flex ml-[5%] w-[100%] text-lg'>상환 가능한 금액</p>
        //         <p className='flex justify-end font-bold text-2xl ml-[5%] w-[90%] bg-white'>{haveMoney.toLocaleString()}원</p> 
        //     </div>
        //     <div>
        //         <label htmlFor='repaymoney' className='flex ml-[5%] w-[100%] text-sm'>상환액</label>
        //         <input className='border rounded-md w-[90%] p-3' type='number' id='repaymoney' placeholder='최소 금액 5,000원' value={loanMoney} onChange={e=> setLoanmoney(e.target.value)} required/>     
        //     </div>
        //     <div className='flex justify-end'>
        //         <p className='border-2 rounded-md pl-2 pr-2 mt-2 ml-4 mr-4 mb-2 bg-gray-300'>상환하기</p>
        //     </div>
        // </div>
        // <br></br>
        // </div>
        // </Modal>
    )
};

export default Loanrepayment;