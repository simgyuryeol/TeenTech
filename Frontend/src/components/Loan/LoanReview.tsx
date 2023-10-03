import React,{useState} from 'react';
import LoanCompoAcco from './LoanCompoAcco';
import axios from 'axios';
import Modal from '../Common/Modal';

const base_URL = import.meta.env.VITE_SERVER_URL;
const accessToken = window.localStorage.getItem('accessToken')

interface LoanReviewProps {
  title: string;
  reason: string;
  loanId: number;
  amount: number;
  period: number;
  interestRate: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

const LoanReview: React.FC<LoanReviewProps> = (props) => {
  const [password, setPassword] = useState('');

  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const approve = () => {
    axios
      .post(base_URL + `/api/v1/loans/parent/approve`, {
        loanId: props.loanId,
        password,
      },{
        headers: {
          Authorization: `Bearer ${accessToken}`,
       }
      })
      .then(response => {
        console.log(response.data.data);
        alert('승인 완료!')
        window.location.reload();
        // const depositid = response.data
        // navigate(`/DepositJoinSuccess/${depositid}`);
      })
      .catch(error => {
        console.log(props.loanId)
        console.log(error);
      });
  };

  const reject = () => {
    axios
      .post(base_URL + `/api/v1/loans/parent/reject`, {
        loanId: props.loanId,
      },{
        headers: {
          Authorization: `Bearer ${accessToken}`,
       }
      })
      .then(response => {
        console.log(response.data.data);
      })
      .catch(error => {
        console.log(props.loanId)
        console.log(error);
      });
  };

  return (
    <LoanCompoAcco loanId={props.loanId} title={props.title} amount={props.amount} interestRate={props.interestRate} period={props.period} reason={props.reason} children='' children2={
    <div className='flex justify-around mb-4'>
        <div className='border-2 border-blue-500 rounded-md'>
            <p onClick={() => handleOpen(1)} className='p-10 pt-1 pb-1'>수락</p>
        </div>  
        <div className='border-2 border-red-500 rounded-md'>
            <p onClick={reject} className='p-10 pt-1 pb-1'>거절</p>
        </div>
        {open === 1 &&
        <Modal >
        <div>
          <div className='flex justify-center text-2xl'>대출 승인<div className='flex ml-44 text-sm' onClick={() => handleOpen(0)} >❌</div></div>
          <div className='text-xl flex'>
            <div className='mr-5'>대출명</div>
            <div className='flex justify-center'>{props.title}</div>
          </div>
          <div className='text-xl flex'>
            <div className='mr-1'>대출금액</div>
            <div className='flex justify-center'>{props.amount.toLocaleString()}원</div>
          </div>
          <div className='flex w-[100%] justify-center items-center'>
            <label htmlFor='password' className='flex text-xl mr-1'>비밀번호</label>
            <input className='border rounded-md flex text-center mr-1' type="password" id="password" name="password" placeholder="비밀번호" value={password} onChange={e=> setPassword(e.target.value)} required/>
            <div className='border rounded-md shadow-md left-[10%] h-[5%]' style={{backgroundColor:'#ABC3D0'}}>
              <div className='flex justify-center pl-2 pr-2 text-black font-bold'  onClick={approve}>승인</div>
            </div>
          </div>
        </div>
      </Modal>}
    </div>
    }/>
  );
};

export default LoanReview;