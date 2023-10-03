import React, { useState } from "react";
import Modal from "../Common/Modal";
import axios from 'axios';

const base_URL = import.meta.env.VITE_SERVER_URL;

interface LoanCreateProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  closeModal: (value: any) => void;
  totalLoanBalance: number;
}

const LoanCreate: React.FC<LoanCreateProps> = (props) => {
  const accessToken = window.localStorage.getItem('accessToken')
  const interestrate = '꺼내써야해';

  const [loanName, setLoanName] = useState("");
  const [loanMoney, setLoanmoney] = useState("");
  const [loanDate, setLoandate] = useState(1);
  const Datehandle = (value) => {setLoandate(value);};
  const [reason, setReason] = useState("");
  const loanLimit = '넣어야됨';
  // const loanLimit = props.totalLoanBalance;

  const Loandata = () => {
    axios
      .post(base_URL + `/api/v1/loans/child/apply`, {
        title : loanName,
        amount : parseInt(loanMoney),
        period : loanDate,
        reason,
        // userId: window.localStorage.getItem('userId'),
      },{
        headers: {
        Authorization: `Bearer ${accessToken}`,
     }})
      .then(response => {
        console.log(response.data.data);
        window.location.reload();
        alert('신청 성공! 승인을 기다려주세요.')
        // const depositid = response.data
        // navigate(`/DepositJoinSuccess/${depositid}`);
      })
      .catch(error => {
        alert('신청 실패')
        console.log(loanName)
        console.log(loanMoney)
        console.log(loanDate)
        console.log(reason)
        console.log(error);
      });
  };

  return (
    <Modal>
      <div className="">
        <div className="mt-2">
          <p className="flex justify-center text-2xl font-bold">대출 신청</p>
          <p className="flex text-sm mt-4 w-[100%]">
            대출 가능 금액: {loanLimit.toLocaleString()}원
          </p>
        </div>
        <div>
          <div className="flex">
            <label htmlFor="name" className="flex w-[100%] text-lg">
              대출 이름
            </label>
            <p className="w-[30%] text-sm">이자율: {interestrate}%</p>
          </div>
          <input
            className="border rounded-md w-[100%] p-3"
            style={{ backgroundColor: "#EBF0F3" }}
            type="text"
            id="name"
            placeholder=""
            value={loanName}
            onChange={(e) => setLoanName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="money" className="flex w-[100%] text-lg">
            대출 금액
          </label>
          <input
            className="border rounded-md w-[100%] p-3"
            style={{ backgroundColor: "#EBF0F3" }}
            type="number"
            id="money"
            placeholder="최소 금액 5,000원"
            value={loanMoney}
            onChange={(e) => setLoanmoney(e.target.value)}
            required
          />
        </div>
        <div className="mt-4 flex justify-between">
              <label htmlFor="depositDate" className="flex text-lg">
                대출 기간
              </label>
              <div className="w-[70%] flex justify-center items-center">
                {[1, 2, 3].map((value) => (
                  <button
                  key={value}
                  id={`depositDate${value}`}
                  name="depositDate"
                  value={value}
                  onClick={() => Datehandle(value)}
                  className={`p-1 mr-2 pl-2 pr-2 border-black  ${
                    loanDate === (value) ? "bg-gray-500 text-white" : ""
                  }`}>
                    {`${value}달`}
                  </button>
                ))}
              </div>
            </div>

        <div className="mb-2">
          <label htmlFor="reason" className="flex w-[100%] text-lg">
            대출 사유
          </label>
          {/* <input className='border rounded-md w-[90%] p-10 break-words' type='textarea' id='reason' placeholder='' value={reason} onChange={e=> setReason(e.target.value)} required/> */}
          <textarea
            className="border rounded-md w-[100%] pb-10 break-words p-3"
            style={{ backgroundColor: "#EBF0F3" }}
            id="reason"
            placeholder=""
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex justify-around mb-4">
          <div className="border-2 border-black rounded-md mr-2 ">
            <p onClick={props.closeModal} className="p-10 pt-1 pb-1">
              취소
            </p>
          </div>
          <div className="border-2 border-black rounded-md ml-2">
            <p onClick={Loandata} className="p-10 pt-1 pb-1">신청</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LoanCreate;
