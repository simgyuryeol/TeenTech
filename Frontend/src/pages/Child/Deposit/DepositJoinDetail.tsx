import React, {useState}  from 'react';
import { Link } from 'react-router-dom';


const DepositJoinDetail: React.FC = () => {
    const interestrate = 2;
    const [depositName, setDepositname] = useState('');
    const [depositMoney, setDepositmoney] = useState('');
    const [depositDate, setDepositdate] = useState('');
    const [depositInterest, setDepositinterest] = useState('');
    const deposittotal = 0;
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
        <h2 className="fixed inset-x-0 top-10 z-50 left-0">신규 예금 가입</h2>
        <div className='border shadow-md rounded-md flex-col m-6'>입력창
            <div className='m-4 flex'>
                <label htmlFor='name' className='flex w-[100%] text-lg'>예금 이름</label>
                <input className='border flex' type='text' id='name' placeholder='' value={depositName} onChange={e=> setDepositname(e.target.value)} required/>
            </div>
            <div className='m-4 flex'>
                <label htmlFor='money' className='flex w-[100%] text-lg'>예치 금액</label>
                <input className='border flex' type='number' id='money' placeholder='최소 금액 5,000원' value={depositMoney} onChange={e=> setDepositmoney(e.target.value)} required/>                
            </div>
            <div className='m-4 flex'>
                <label htmlFor='date' className='flex w-[100%] text-lg'>예치 기간</label>
                <input className='border flex  w-[100%]' type='date' id='date' placeholder='' value={depositDate} onChange={e=> setDepositdate(e.target.value)} required/>                
            </div>
            <div className='m-4 flex'>
              <div className='flex w-[100%] text-lg'>
                월 이율
              </div>
              <div className='flex flex-col w-[100%]'>
              <label htmlFor="interest"></label>
                  <div className="form-interest flex justify-around">
                    <div className="form-interest">
                      <label className="inputlabel" htmlFor="interest1">
                        단리
                      </label>
                      <input
                        type="radio"
                        id="interest1"
                        name="interest"
                        value="단리"
                        onChange={e => setDepositinterest(e.target.value)}
                        ></input>
                    </div>
                    <div className="form-interest">
                      <label className="inputlabel" htmlFor="interest2">
                        복리
                      </label>
                      <input
                        type="radio"
                        id="interest2"
                        name="interest"
                        value="복리"
                        onChange={e => setDepositinterest(e.target.value)}
                        ></input>
                    </div>
                  </div>
                  <div className='flex justify-center'>
                    <p className='border w-[200%]'>{interestrate}%</p>
                  </div>
                </div>
            </div>
            <div className='m-4 flex'>
              <p className='flex  w-[100%] text-lg'>만기 지급액</p>
                <p className='border flex w-[100%]'>
                {deposittotal.toLocaleString()}원 예치금 + 이자 더해
                </p></div>
        </div>
        <div className='border rounded-md shadow-md mr-10 ml-10 mt-10 left-[10%] h-[5%] w-[60%] bg-gray-200'>
        <Link to='/DepositJoinSuccess'>
        <div className='flex justify-center m-2'>예금 가입하기</div>
        </Link>
        </div>
        </div>
    )
};

export default DepositJoinDetail;