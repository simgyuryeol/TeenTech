import React, { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { childIdAtom } from "../../recoil/childIdAtom";


interface LoanStatusProps {
  children: ReactNode;
  totalLoanBalance: number;
  totalInProgressLoanCount: number;
  loanLimitation: number;
}

const LoanStatus: React.FC<LoanStatusProps> = (props) => {
  const name = useRecoilValue(childIdAtom).name;
  const totalMoney = props.loanLimitation;
  const lendMoney = props.totalLoanBalance
  const progress = (lendMoney / totalMoney) * 100;
  return (
    <div className="border rounded-xl mr-6 ml-6 bg-white text-xl mt-3 drop-shadow-md">
      <div className="flex mt-2">
        <h2 className="mt-2 mb-2 text-2xl text-start ml-3">{name}님 대출 현황</h2>
        <div className="bg-blue-400 mx-3 my-2 px-2 text-2xl text-start text-white rounded-lg">
          {props.totalInProgressLoanCount}건
        </div>
      </div>
      <div className="my-1">
        <div className="ml-3 text-start">총 대출 잔액</div>
        <div className="mr-3 text-end text-3xl">{props.totalLoanBalance}원</div>
      </div>
      {/* <div className="flex justify-between text-red-500 my-3">
        <p className="flex ml-3">이자</p>
        <p className="flex mr-3">100원</p>
      </div> */}
      {/* <div className="flex justify-between">
        <p className="flex ml-4">대출 한도</p>
      </div> */}
      <div className="text-start mx-3">
        대출받을 수 있는 금액은 {totalMoney - lendMoney} 입니다
      </div>
      {/* progress바 */}
      <div className="">
        <div className="flex mx-3 pt-2 relative">
          <div
            className="bg-gray-300 h-3 rounded-md "
            style={{ width: "98%", top: "30px" }}
          ></div>
          <div
            className="bg-blue-500 h-3 rounded-md absolute"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      {/* 여기까지 */}
      <div className="flex justify-between mx-3">
        <div className="text-lg text-blue-500">{lendMoney}</div>
        <div className="text-lg text-gray-500">{totalMoney}</div>
      </div>

      {props.children}
    </div>
  );
};

export default LoanStatus;
