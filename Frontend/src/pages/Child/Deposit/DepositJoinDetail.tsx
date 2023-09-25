import React, {useState}  from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../../components/Common/Modal';



const DepositJoinDetail: React.FC = () => {
    const interestrate = 2;
    const [depositName, setDepositname] = useState('');
    const [depositMoney, setDepositmoney] = useState('0');
    const depositMoney2 = parseInt(depositMoney) >= 10000 ? parseInt(depositMoney) / 10000 + '만' : depositMoney;
    const [depositDate, setDepositdate] = useState('');
    const [depositInterest, setDepositinterest] = useState('');
    const deposittotal = 0;
    return (
      <Modal>
        <div>

            <h2 className="flex justify-center">신규 예금 가입</h2>
            <div className='mt-6 flex'>
                <label htmlFor='name' className='flex w-[100%] text-lg'>예금 이름</label>
                <input className='border rounded-md flex text-center' type='text' id='name' placeholder='' value={depositName} onChange={e=> setDepositname(e.target.value)} required/>
            </div>
            <div className='mt-4 flex'>
                <label htmlFor='money' className='flex w-[100%] text-lg'>예치 금액</label>
                <div>
                <input className='border rounded-md flex text-center' type='number' id='money' placeholder='최소 금액 5,000원' value={depositMoney} onChange={e=> setDepositmoney(e.target.value)} required/>                
                <p className='text-sm flex justify-end'>{depositMoney2}원</p>
                </div>
            </div>
            <div className='mt-4 flex'>
                <label htmlFor='date' className='flex w-[100%] text-lg'>예치 기간</label>
                <div>
                <input className='border rounded-md flex  w-[100%]' type='date' id='date' placeholder='' value={depositDate} onChange={e=> setDepositdate(e.target.value)} required/>                
                <p className='text-sm flex justify-end'>{depositDate}</p>
                </div>
            </div>
            <div className='mt-4 flex'>
              <div className='flex items-center w-[100%] text-lg'>
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
                    <p className='flex justify-center border rounded-md w-[200%]'>{interestrate}%</p>
                  </div>
                </div>
            </div>
            <div className='mt-4 mb-6 flex'>
              <p className='flex  w-[100%] text-lg'>만기 지급액</p>
                <p className='border rounded-md flex justify-center w-[100%]'>
                {deposittotal.toLocaleString()}원 예치금 + 이자 넣어
                </p></div>
        <div className='border rounded-md shadow-md mr-10 ml-10 mt-5 left-[10%] h-[5%] w-[60%] ' style={{backgroundColor:'#ABC3D0'}}>
        <Link to='/DepositJoinSuccess'>
        <div className='flex justify-center m-2 text-black font-bold'>예금 가입하기</div>
        </Link>
        </div>
        </div>
      </Modal>
    )
};

export default DepositJoinDetail;