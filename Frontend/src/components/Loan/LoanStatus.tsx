import React, { ReactNode } from "react";

interface LoanStatusProps {
  children: ReactNode;
}

const LoanStatus: React.FC<LoanStatusProps> = (props) => {
  return (
    <div className="border rounded-xl mr-6 ml-6 bg-white text-xl mt-3 drop-shadow-md">
      <h2 className="mt-2 mb-2 text-2xl p">규렬님 대출 현황</h2>
      <div className="flex justify-between">
        <p className="flex ml-4">대출 보유 개수</p>
        <p className="flex mr-4">2건</p>
      </div>
      <div className="flex justify-between">
        <p className="flex ml-4">총 대출 잔액</p>
        <p className="flex mr-4">10,000원</p>
      </div>
      <div className="flex justify-between">
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
