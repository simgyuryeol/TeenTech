import React from "react";
import { Link } from "react-router-dom";
import LottoList from "../../../components/Lotto/LottoList";

const Lotto: React.FC = () => {
  return (
    <div className="pt-24">
      <div className="flex justify-center">
        <div className="w-1/2 ml-4 mr-2 bg-white rounded-2xl	">
          <div className="my-2">복권 교환권</div>
          <div className="my-2">2장</div>
        </div>
        <div className="w-1/2 mr-4 ml-2 bg-white	rounded-2xl	">
          <div className="my-2">당첨금</div>
          <div className="my-2">5,000원</div>
        </div>
      </div>
      <div>
        <div className="mx-4 mt-4 p-3 bg-white	rounded-2xl">
          <Link to="/LottoChange">복권 교환하기</Link>
        </div>
      </div>

      <div className="my-3 mx-4 pb-2 bg-white	rounded-2xl">
        <LottoList />
      </div>

      <h2>자식 복권 페이지</h2>
    </div>
  );
};

export default Lotto;
