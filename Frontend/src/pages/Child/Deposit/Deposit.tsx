import React from "react";
import Credit from "../../../components/Credit";
import { Link } from "react-router-dom";

const Deposit: React.FC = () => {
  const DepositName = "뀨뀨 정기예금";
  const interestrate = 10;
  const interest = "복리";
  const maturity = "2023.10.06";
  const credit = "3";
  return (
    <div className="pt-24 "  style={{backgroundColor:'rgb(182, 219, 238)'}}>
      <div className="mb-4">
        <Credit children={
                <div
                className="rounded-xl"
                style={{ borderColor: "#ABD0CE" }}
                >
                <div className="flex justify-center">
                <p className="text-xl">{credit}등급</p>
                <p className="text-md flex items-center">을 위한 예금 금리</p>
                </div>
                <p className="text-2xl font-bold mb-2">{"1.5 ~ 2"}%</p>
              </div>
        }></Credit>
        </div>

      <div>
        <div className="text-2xl font-bold mb-3">가입한 예금 상품</div>
        <Link to="/DepositDetail">
          <div
            className="rounded-xl shadow-md m-6 mb-1 flex justify-around bg-white"
            style={{ borderColor: "#ABD0CE" }}
          >
            <div className="m-3">
              <p className="text-black">{DepositName}</p>
              <div className="flex justify-around">
                <p
                  className={
                    interestrate < 0 ? "text-blue-500" : "text-red-500"
                  }
                >
                  {interestrate}%
                </p>
                <p
                  className="text-white border rounded-md pr-1 pl-1"
                  style={{ backgroundColor: "#476C82" }}
                >
                  {interest}
                </p>
              </div>
            </div>
            <div className="m-3">
              <p className="text-black">만기일</p>
              <p className="text-black">{maturity}</p>
            </div>
          </div>
        </Link>
        <Link to="/DepositDetail">
          <div
            className="rounded-xl shadow-md m-6 mb-1 flex justify-around bg-white"
            style={{ borderColor: "#ABD0CE" }}
          >
            <div className="m-3">
              <p className="text-black">{DepositName}</p>
              <div className="flex justify-around">
                <p
                  className={
                    interestrate < 0 ? "text-blue-500" : "text-red-500"
                  }
                >
                  {interestrate}%
                </p>
                <p
                  className="text-white border rounded-md pr-1 pl-1"
                  style={{ backgroundColor: "#476C82" }}
                >
                  {interest}
                </p>
              </div>
            </div>
            <div className="m-3">
              <p className="text-black">만기일</p>
              <p className="text-black">{maturity}</p>
            </div>
          </div>
        </Link>

        {/* {deposits.map((deposit, index) => (
            <div key={index} className='border rounded-md m-6 flex justify-around'>
                <div className='m-3'>
                    <p className='text-black'>{deposit.DepositName}</p>
                    <div className='flex justify-around'>
                    <p className={deposit.interestrate < 0 ? 'text-blue-500' : 'text-red-500'}>{deposit.interestrate}</p>
                    <p className='text-black'>{deposit.interest}</p>
                    </div>
                </div>
                <div className='m-3'>
                    <p className='text-black'>만기일</p>
                    <p className='text-black'>{deposit.maturity}</p>
                </div>
            </div>
            ))} */}
      </div>
      <div
        className="rounded-md shadow-md fixed bottom-10 left-[10%] w-[80%] bg-gray-200"
        style={{ backgroundColor: "rgb(255, 169, 184)" }}
      >
        <Link to="/DepositJoinDetail">
          <p className="text-lg m-4 font-bold" style={{ color: "black"}}>
          {/* <p className="text-lg m-4 font-bold" style={{ color: "#3B5869"}}> */}
            예금 가입하기+
          </p>
        </Link>
      </div>
    </div>
      
  );
};

export default Deposit;
