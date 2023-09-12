import React from "react";
import { Link } from "react-router-dom";
import LottoList from "../../../components/Lotto/LottoList";

const Lotto: React.FC = () => {
  return (
    <div className="pt-16">
      <div className="flex justify-center">
        <div className="w-1/2 ml-4 mr-2" style={{ backgroundColor: "pink" }}>
          <div className="my-2">복권 교환권</div>
          <div className="my-2">2장</div>
        </div>
        <div className="w-1/2 mr-4 ml-2" style={{ backgroundColor: "skyblue" }}>
          <div className="my-2">당첨금</div>
          <div className="my-2">5,000원</div>
        </div>
      </div>
      <div>
        <LottoList />
      </div>
      <Link to="/LottoChange">복권 바꾸기</Link>
      <h2>자식 복권 페이지</h2>
    </div>
  );
};

export default Lotto;
