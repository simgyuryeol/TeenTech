import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  id: number | null;
};

const Total: React.FC<Props> = ({ id }) => {
  const navigate = useNavigate();
  const clickDeposit = () => {
    navigate(`/Deposit`);
  };
  const clickStock = () => {
    navigate(`/Stock`);
  };
  const clickLoan = () => {
    navigate(`/Loan`);
  };
  return (
    <div className="mx-2">
      <div
        className="rounded-2xl drop-shadow	mb-3"
        style={{
          backgroundColor: "#E961A4",
        }}
        onClick={clickDeposit}
      >
        <div className="text-2xl pt-2 pl-3 text-start text-white">
          나의 예금 내역 확인하기
        </div>
        <div>
          <div className=" pl-3 text-start text-white">
            얼마가 모였는지 확인해 볼까요?
          </div>
          <div className="px-3 pb-2 text-end">
            {/* <div className="text-white text-xl">+얼마</div> */}
            <div className="text-white text-2xl">10,500 모았어요!</div>
          </div>
        </div>
      </div>

      <div
        className="rounded-2xl drop-shadow mb-3"
        style={{
          backgroundColor: "#68B9E3",
        }}
        onClick={clickStock}
      >
        <div className="text-2xl pt-2 pl-3 text-start text-white">
          나의 주식 내역 확인하기
        </div>
        <div>
          <div className="pl-3 text-start text-white">
            오늘 주식시장엔 어떤 변화가 있을까요?
          </div>
          <div className="px-3 pb-2 text-end">
            <div className="text-white text-xl">+ 얼마</div>
            <div className="text-white text-3xl">10,500</div>
          </div>
        </div>
      </div>

      {/* <div>
        <div className="my-3" style={{ backgroundColor: "green" }}>
          <Credit />
        </div>
      </div> */}
      <div className="flex justify-between">
        <div
          className="rounded-2xl drop-shadow bg-blue-200 w-1/2 mr-4 text-start"
          style={{ position: "relative" }}
          onClick={clickLoan}
        >
          <div className="ml-3 mt-3">
            <div className="text-l">용돈이 부족해요!</div>
            <div className="text-xl">대출 신청하러 가기</div>
          </div>
          <img
            src="../../../src/assets/main/loan.png"
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          />
        </div>

        <div className="justify-center w-1/2">
          <div
            className="rounded-2xl drop-shadow mb-3 text-xl"
            style={{ backgroundColor: "#D8E6EE" }}
          >
            <div className="pt-2 pl-3 text-start">대출잔액</div>
            <div className="px-3 pt-4 pb-2 text-end">대출잔액</div>
          </div>
          <div
            className="rounded-2xl drop-shadow text-xl"
            style={{ backgroundColor: "#D8E6EE" }}
          >
            <div className="pt-2 pl-3 text-start">대출 상환일</div>
            <div className="px-3 pt-4 pb-2 text-end">D - 10</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Total;
