import React, { ReactNode } from "react";

interface LoanStatusProps {
  children: ReactNode;
}

const LoanStatus: React.FC<LoanStatusProps> = (props) => {
  return (
    <div className="border rounded-xl mr-6 ml-6 bg-white text-xl mt-3 drop-shadow-md">
      <div className="flex mt-2">
        <h2 className="mt-2 mb-2 text-2xl text-start ml-3">규렬님 대출 현황</h2>
        <div className="bg-blue-400 mx-3 my-2 px-2 text-2xl text-start text-white rounded-lg">3건</div>
      </div>
      <div className="my-1">
        <div className="ml-3 text-start">총 대출 잔액</div>
        <div className="mr-3 text-end text-3xl">10,000원</div>
      </div>
      {/* <div className="flex justify-between">
        <p className="flex ml-4">대출 보유 개수</p>
        <p className="flex mr-4">2건</p>
      </div> */}

      <div className="flex justify-between text-red-500">
        <p className="flex ml-4">이자</p>
        <p className="flex mr-4">100원</p>
      </div>
      <div className="flex justify-between">
        <p className="flex ml-4">대출 한도</p>
      </div>
      <div className="border">그래프</div>
      {props.children}
    </div>
  );
};

export default LoanStatus;
