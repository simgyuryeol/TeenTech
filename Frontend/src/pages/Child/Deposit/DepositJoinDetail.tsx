import React, {useState, useEffect}  from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/Common/Modal';
import axios from 'axios';

const base_URL = import.meta.env.VITE_SERVER_URL;

const DepositJoinDetail: React.FC = () => {
    const navigate = useNavigate();
    const interestrate = 2;
    const [depositName, setDepositname] = useState('');
    const [depositMoney, setDepositmoney] = useState('');
    const depositMoney2 = parseInt(depositMoney) >= 10000 ? '약'+ parseFloat(((parseInt(depositMoney)/10000).toFixed(1))) + '만' : depositMoney;
    const [depositDate, setDepositdate] = useState(1);
    const Datehandle = (value) => {setDepositdate(value);};
    const Interesthandle = (index) => {setDepositinterest(index);};
    const [depositInterest, setDepositinterest] = useState(0);
    const [deposittotal, setDeposittotal] = useState(0);

    const handleCalculateTotal = () => {
      const money = parseInt(depositMoney);

      if (isNaN(money)) {
        setDeposittotal(0);
        return;
      }
    
      if (depositInterest === 0) {
        const total = money + (money * interestrate / 100 * depositDate);
        const total2 = Math.floor(total);
        setDeposittotal(total2);
      } else if (depositInterest === 1) {
        const total = money * (1 + interestrate / 100) ** (depositDate);
        const total2 = Math.floor(total);
        setDeposittotal(total2);
      } else {
        // 예외 처리: 유효하지 않은 경우
        setDeposittotal(0); // 예외 처리에 따라 예치 총액 초기화
      }
    };

    const handleDepositMoneyChange = (e) => {
      const money = e.target.value;
      setDepositmoney(money);
    };

    useEffect(() => {
      handleCalculateTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [depositMoney, depositInterest, depositDate]);

    const child_id = 34

    const Depositdata = () => {
      axios
        .post(base_URL + `/api/v1/${child_id}/deposits/create`, {
          depositName,
          money : parseInt(depositMoney),
          interestType : depositInterest,
          weeks : depositDate,
          // userId: window.localStorage.getItem('userId'),
        })
        .then(response => {
          console.log(response.data.data);
          navigate('/DepositJoinSuccess', { state: response.data.data })
          // const depositid = response.data
          // navigate(`/DepositJoinSuccess/${depositid}`);
        })
        .catch(error => {
          alert('가입 실패')
          console.log(depositName)
          console.log(depositMoney)
          console.log(depositInterest)
          console.log(depositDate)
          console.log(child_id)
          console.log(error);
        });
    };


    return (
      <Modal>
        <div className='w-[95%]'>
            <h2 className="flex justify-center text-2xl mb-2">신규 예금 가입</h2>
            <div className='border border-gray-400 rounded-md pl-5 pr-5'>
            <div className='mt-2 pt-2 flex'>
                <label htmlFor='name' className='flex w-[100%] text-lg'>예금 이름</label>
                <input className='border rounded-md flex text-center' type='text' id='name' placeholder='' value={depositName} onChange={e=> setDepositname(e.target.value)} required/>
            </div>
            <div className='mt-4 flex'>
                <label htmlFor='money' className='flex w-[100%] text-lg'>예치 금액</label>
                <div>
                <input className='border rounded-md flex text-center' type='number' id='money' placeholder='최소 금액 5,000원' value={depositMoney} onChange={handleDepositMoneyChange} required/>                
                <p className='text-sm flex justify-end'>{depositMoney2}원</p>
                </div>
            </div>
            <div className="mt-4 flex justify-between">
              <label htmlFor="depositDate" className="flex text-lg">
                예치 기간
              </label>
              <div className="w-[70%] flex justify-between items-center">
                {[1, 2, 3, 4].map((value) => (
                  <button
                  key={value}
                  id={`depositDate${value}`}
                  name="depositDate"
                  value={value}
                  onClick={() => Datehandle(value)}
                  className={`p-1 border-black  ${
                    depositDate === (value) ? "bg-gray-700 text-white" : ""
                  }`}>
                    {`${value}주`}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 flex">
              <label htmlFor="depositInterest" className="flex text-lg mr-6">
                월 이율
              </label>
              <div className='flex justify-center'>
              <div className="flex items-center">
                {['단리', '복리'].map((value, index) => (
                  <button
                  key={index}
                  id={`depositInterest${value}`}
                  name="depositInterest"
                  value={(index)}
                  onClick={() => Interesthandle((index))}
                  className={`p-1 border-black mr-2 ${
                    depositInterest === (index) ? "bg-gray-700 text-white" : ""
                  }`}>
                    {`${value}`}
                  </button>
                ))}
              </div>
                  <div className='flex justify-center items-center'>
                    <p className='flex justify-center border rounded-md w-[200%] p-1 pl-7 pr-7 ml-1'>{interestrate}%</p>
                  </div>
              </div>
            </div>
            <div className='mt-4 mb-4 flex'>
              <p className='flex  w-[100%] text-lg'>만기 지급액</p>
                <p className='border rounded-md flex justify-center w-[100%]'>
                {deposittotal.toLocaleString()}원
                </p></div>
        </div>
        <div className='border rounded-md shadow-md mr-10 ml-10 mt-2 left-[10%] h-[5%]' style={{backgroundColor:'#ABC3D0'}}>
        <div className='flex justify-center m-2 text-black font-bold'  onClick={Depositdata}>예금 가입하기</div>
        </div>
        </div>
      </Modal>
    )
};

export default DepositJoinDetail;