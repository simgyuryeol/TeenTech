import React,{useEffect, useState} from 'react';
import LoanCompoAcco from './LoanCompoAcco';

interface LoanDetailProps {
  title: string;
  reason: string;
  loanId: number;
  amount: number;
  period: number;
  interestRate: number;
  state: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

const LoanDetail: React.FC<LoanDetailProps> = (props) => {
  const [state, setState] = useState('')
  useEffect(() => {
    if(props.state === "COMPLETE"){
      setState('상환 완료')
    }else{
      setState('거절')
    }
  }, []);  

  return (
    <LoanCompoAcco loanId={props.loanId} title={props.title} amount={props.amount} interestRate={props.interestRate} period={props.period} reason={props.reason} children={
        <div className='flex justify-between mt-4'>
            <div className={`border-2 rounded-md ml-5 ${props.state === "COMPLETE" ? "border-green-500" : "border-red-500"}`}>
                <p className='p-6 pt-1 pb-1'>{state}</p>
            </div>
            <div className='border-2 border-grey-500 rounded-md mr-5'>
                <p className='p-10 pt-1 pb-1'>삭제</p>
            </div>
        </div>
} children2={''}/>
  );
};

export default LoanDetail;
