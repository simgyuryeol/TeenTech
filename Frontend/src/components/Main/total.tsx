import React from "react";
import Credit from "../Credit";

const Total: React.FC = () => {
  return (
    <div className="container">
      <div>규렬이 코 묻은 돈</div>
      <div style={{ backgroundColor: "pink" }}>
        <div>용돈 (쓸 수 있는 돈)</div>
        <div>170,000원</div>
      </div>
      <div className="flex justify-center items-center">
        <div className="" style={{ backgroundColor: "skyblue" }}>
          <div>예금</div>
          <div>10,500</div>
        </div>
        <div className="flex flex-wrap" style={{ backgroundColor: "yellow" }}>
          <div style={{ width: "100%" }}>
            <div>주식</div>
            <div>+0.2%</div>
          </div>
          <div className="flex justify-end" style={{ width: "100%" }}>
            <div>상승</div>
            <div>8,200</div>
          </div>
        </div>
      </div>
      <div>
        <div>신용등급</div>
        <div>
          <Credit />
        </div>
      </div>
      <div>
        <div>대출잔액</div>
        <div>대출잔액</div>
      </div>
      <div>
        <div>대출 상환일</div>
        <div>D - 10</div>
      </div>
    </div>
  );
};

export default Total;
