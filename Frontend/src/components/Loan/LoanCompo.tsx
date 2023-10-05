import React, { ReactNode } from "react";
import Modal from "../Common/Modal";
// import { number } from "prop-types";

interface LoanCompoProps {
  children: ReactNode;
  children2: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  closeModal: (value: any) => void;
  loanId: number; 
  title: string; 
  amount: number;
  maturityDate: string;
  reason: string;
  interestRate: number;
  initialBalance: number;
}

const LoanCompo: React.FC<LoanCompoProps> = (props) => {
  const interestrate = props.interestRate;
  const loanName = props.title;
  const loanMoney = props.amount;
  const maturity = props.maturityDate;
  const reason = props.reason;

  return (
    <Modal>
      <div className="w-[100%]">
        {props.children}
        <div className="flex flex-col mt-4">
          <div className="flex">
            <p className="flex ml-[5%] w-[100%] text-lg">대출 이름</p>
            <p className="w-[30%] text-xs">이자율: {interestrate}%</p>
          </div>
          <p
            className="ml-[5%] border rounded-md w-[90%] p-3"
            style={{ backgroundColor: "#EBF0F3" }}
          >
            {loanName}
          </p>
        </div>
        <div>
          <p className="flex ml-[5%] w-[100%] text-lg">대출 금액</p>
          <p
            className="ml-[5%] border rounded-md w-[90%] p-3"
            style={{ backgroundColor: "#EBF0F3" }}
          >
            {props.initialBalance.toLocaleString()}원  (원금{loanMoney.toLocaleString()}원 + 이자{props.initialBalance - loanMoney}원)
          </p>
        </div>
        <div>
          <p className="flex ml-[5%] w-[100%] text-lg">대출 기간</p>
          <p
            className="ml-[5%] border rounded-md w-[90%] p-3"
            style={{ backgroundColor: "#EBF0F3" }}
          >
            {maturity}
          </p>
        </div>
        <div>
          {/* <div className='flex flex-col w-[100%]'>
              <p className='flex ml-[5%] w-[100%] text-lg'>상환 방법</p>
              <p className='ml-[5%] border rounded-md w-[90%] p-3' style={{backgroundColor:'#EBF0F3'}}>{repayment}</p> 
            </div> */}
        </div>
        <div className="mb-4">
          <p className="flex ml-[5%] w-[100%] text-lg">대출 사유</p>
          <p
            className="ml-[5%] border rounded-md w-[90%] p-4 pb-10 break-words"
            style={{ backgroundColor: "#EBF0F3" }}
          >
            {reason}
          </p>
        </div>
        <div className="flex justify-around mb-4">
          <div className="border-2 border-black rounded-md ">
            <p onClick={props.closeModal} className="p-10 pt-1 pb-1">
              취소
            </p>
          </div>
          {props.children2}
        </div>
      </div>
    </Modal>
  );
};

export default LoanCompo;
