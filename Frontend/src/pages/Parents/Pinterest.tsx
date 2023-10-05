import React, { useState } from "react";
import Credit from "../../components/Credit";
import { Icon } from "@iconify/react";
import InterestInfo from "../../components/Deposit/DepositInterestInfo";
import LoanInterestInfo from "../../components/Loan/LoanInterestInfo";
import axios from "axios";

const base_URL = import.meta.env.VITE_SERVER_URL;

const Pinterest: React.FC = () => {
  const [pocketMoney, setPocketmoney] = useState(50000);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pocketMoneycycle, setPocketmoneycycle] = useState<number>(1);
  const [depositInterest, setDepositinterest] = useState(2);
  const [loanInterest, setLoaninterest] = useState(0);
  const child_id = 34;
  const parent_id = 34;

  const handlePocketmoneycycle = (e) => {
    const money = e.target.value;
    setPocketmoneycycle(money);
  };
  const handlePocketmoney = (e) => {
    const money = e.target.value;
    setPocketmoney(money);
  };
  const handleDepositinterest = (e) => {
    const money = e.target.value;
    setDepositinterest(money);
  };
  const handleLoaninterest = (e) => {
    const money = e.target.value;
    setLoaninterest(money);
  };

  const [open, setOpen] = React.useState(0);
  const pinmoneyset = () => {
    axios
      .post(base_URL + `/api/v1/parents/${parent_id}/${child_id}/pinmoney`, {
        pinmoney: pocketMoney,
        // userId: window.localStorage.getItem('userId'),
      })
      .then((response) => {
        console.log(response.data);
        alert("용돈 설정 완료");
        // const depositid = response.data
        // navigate(`/DepositJoinSuccess/${depositid}`);
      })
      .catch((error) => {
        alert("용돈 설정 실패");
        console.log(error);
      });
  };
  const interestset = () => {
    axios
      .post(base_URL + `/api/v1/parents/${parent_id}/${child_id}/interest`, {
        deposit: depositInterest,
        loan: loanInterest,
        // userId: window.localStorage.getItem('userId'),
      })
      .then((response) => {
        alert("이자율 설정 완료");
        console.log(response.data);
        // const depositid = response.data
        // navigate(`/DepositJoinSuccess/${depositid}`);
      })
      .catch((error) => {
        alert("이자율 설정 실패");
        console.log(depositInterest);
        console.log(loanInterest);
        console.log(child_id);
        console.log(error);
      });
  };

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="pt-24">
      {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
      <div>
        <p className="text-xl font-bold">용돈 주기 설정</p>
        <div
          className="flex flex-col border-2 rounded-xl mr-6 ml-6 mb-1 p-2 pt-4 bg-white"
          style={{ borderColor: "#ABD0CE" }}
        >
          <div className="flex justify-between ml-[5%] mr-[8%]">
            <p className="text-xl font-bold">용돈 주기</p>
            <div className="border-2 rounded-md">
              <select onChange={handlePocketmoneycycle}>
                <option value={1}>매달 1일</option>
                <option value={2}>매주 월요일</option>
              </select>
            </div>
          </div>
          <div>
            <input
              className="border-2 rounded-md w-[90%] p-3"
              type="number"
              id="interest"
              placeholder="용돈 금액"
              value={pocketMoney}
              onChange={handlePocketmoney}
              required
            />
            원
          </div>
        </div>
        <p className="flex justify-end text-sm mr-6 ml-6">
          설정에 따라 자동이체됩니다.
        </p>
        <div className="flex justify-end m-2 mr-6">
          <p
            onClick={pinmoneyset}
            className="p-10 pt-1 pb-1 border-2 border-black  rounded-md"
          >
            완료
          </p>
        </div>
      </div>
      <hr className="border-2"></hr>
      <div>
        <p className="text-xl font-bold">이자율 설정</p>
        <Credit>{}</Credit>
        {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
        <div
          className="flex border-2 rounded-xl mr-6 ml-6 mb-4 p-2 pt-4 mt-4 bg-white"
          style={{ borderColor: "#ABD0CE" }}
        >
          <div className="mt-4">
            <Icon
              onClick={() => handleOpen(1)}
              className="text-2xl"
              icon="ant-design:exclamation-circle-outlined"
            />
          </div>
          <p className="w-[20%] text-xl font-bold mt-4">예금</p>
          <div className="w-[80%] flex flex-col">
            <div>
              <input
                className="border-2 rounded-md w-[90%] p-3"
                type="number"
                id="interest"
                placeholder="0.0 ~ 5.0"
                value={depositInterest}
                onChange={handleDepositinterest}
                required
              />
              %
            </div>
            <div className="flex justify-end mr-5">한달 최대 5,000원</div>
          </div>
        </div>
        {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
        <div
          className="flex border-2 rounded-xl mr-6 ml-6 mb-4 p-2 pt-4 bg-white"
          style={{ borderColor: "#ABD0CE" }}
        >
          <div className="mt-4">
            <Icon
              onClick={() => handleOpen(2)}
              className="text-2xl"
              icon="ant-design:exclamation-circle-outlined"
            />
          </div>
          <p className="w-[20%] text-xl font-bold mt-4">대출</p>
          <div className="w-[80%] flex flex-col">
            <div>
              <input
                className="border-2 rounded-md w-[90%] p-3"
                type="number"
                id="interest"
                placeholder="0.0 ~ 5.0"
                value={loanInterest}
                onChange={handleLoaninterest}
                required
              />
              %
            </div>
            <div className="flex justify-end mr-5">한달 최대 5,000원</div>
          </div>
        </div>
        {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
        <div className="flex justify-end mr-6">
          <p
            onClick={interestset}
            className="p-10 pt-1 pb-1 border-2 border-black  rounded-md"
          >
            완료
          </p>
        </div>
        <br></br>
      </div>
      {open === 1 && (
        <InterestInfo closeModal={handleOpen} children={""}></InterestInfo>
      )}
      {open === 2 && (
        <LoanInterestInfo closeModal={handleOpen}></LoanInterestInfo>
      )}
    </div>
  );
};

export default Pinterest;
