import React, {useState}  from 'react';
import { Link } from 'react-router-dom';


const DepositJoinDetail: React.FC = () => {
    const [depositName, setDepositname] = useState('');
    const [depositMoney, setDepositmoney] = useState('');
    const [depositDate, setDepositdate] = useState('');
    const [depositInterest, setDepositinterest] = useState('');
    return (
        <div className='bg-'>
        <h2 className="fixed inset-x-0 top-10 z-50 left-0">신규 예금 가입</h2>
        <div className='border shadow-md rounded-md'>입력창
            <div>
                <label htmlFor='name'>예금 이름</label>
                <input className='border' type='text' id='name' placeholder='' value={depositName} onChange={e=> setDepositname(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor='money'>예금 금액</label>
                <input className='border' type='number' id='money' placeholder='최소 금액 5000원' value={depositMoney} onChange={e=> setDepositmoney(e.target.value)} required/>                
            </div>
            <div>
                <label htmlFor='date'>예금 기간</label>
                <input className='border' type='date' id='date' placeholder='' value={depositDate} onChange={e=> setDepositdate(e.target.value)} required/>                
            </div>
            <label htmlFor="interest"></label>
                <div className="form-interest flex">
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
            <div className='flex'>월 이율 
                <p className='border'>2% 받아와서 보여줘</p>
                </div>
            <div className='flex'>만기 지급액 
                <p className='border'>
                0원 예치금 + 이자 더해
                </p></div>
        </div>
        <Link to='/DepositJoinSuccess'>
        <div className='border'>예금 가입하기</div>
        </Link>
        </div>
    )
};

export default DepositJoinDetail;