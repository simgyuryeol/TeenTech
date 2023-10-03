import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loan from "../../../src/assets/main/loan.png";
import up from "../../../src/assets/main/up.png";
import down from "../../../src/assets/main/down.png";
import axios from "axios";

type Props = {
  childId: number | null;
};

interface Detail {
  creditRating: number;
  deposit: number;
  loanBalance: number;
  loneDay: number;
  stock: number;
  stockRate: number;
  totalBalance: null | number;
  username: null | string;
}

const Total: React.FC<Props> = ({ childId }) => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState([]);
  const [childDetail, setChildDetail] = useState<Detail>();
  const getDetail = () => {
    axios
      .get(`https://j9e207.p.ssafy.io/api/v1/childs/child/34`)
      .then((response) => {
        setChildDetail(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDetail();
  }, []);

  const clickDeposit = () => {
    navigate(`/Deposit`);
  };
  const clickStock = () => {
    navigate(`/Stock`);
  };
  const clickLoan = () => {
    navigate(`/Loan`);
  };

  // if (!childDetail) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div className="mx-2 pb-2">
      <div
        className="rounded-2xl drop-shadow mb-3"
        style={{
          backgroundColor: "#FF7EA5",
        }}
        onClick={clickDeposit}
      >
        <div className="text-2xl pt-2 pl-3 text-start text-white">
          나의 예금 내역 확인하기
        </div>
        <div>
          <div className=" pl-3 text-start text-gray-700">
            얼마가 모였는지 확인해 볼까요?
          </div>
          <div className="px-3 pb-2 text-end">
            {/* <div className="text-white text-xl">+ {childDetail.}</div> */}
            <div className="text-gray-700 text-2xl">
              {childDetail?.deposit
                ? `${childDetail.deposit}원 모았어요!`
                : "Loading..."}
            </div>
          </div>
        </div>
      </div>

      <div
        className="rounded-2xl drop-shadow mb-3"
        style={{
          backgroundColor: "#3C95FF",
        }}
        onClick={clickStock}
      >
        <div className="text-2xl pt-2 pl-3 text-start text-gray-700">
          나의 주식 내역 확인하기
        </div>
        <div>
          <div className="pl-3 text-start text-gray-700">
            오늘 주식시장엔 어떤 변화가 있을까요?
          </div>
          <div className="px-3 pb-2 text-end">
            <div className="text-gray-700 text-xl">
              {childDetail?.stockRate ? (
                <>
                  {childDetail.stockRate > 0 ? (
                    <img src={up} alt="Up" />
                  ) : (
                    <img src={down} alt="Down" />
                  )}
                  {Math.abs(childDetail.stockRate)}
                </>
              ) : (
                "Loading..."
              )}
              {/* {childDetail?.stockRate
                ? `+ ${childDetail.stockRate} 얼마`
                : "Loading..."} */}
              {/* {childDetail.stockRate} */}
            </div>
            <div className="text-gray-700 text-3xl">
              {childDetail?.stock || "Loading..."}
              {/* {childDetail.stock} */}
            </div>
          </div>
        </div>
      </div>
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
            src={Loan}
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
            style={{ backgroundColor: "white" }}
          >
            <div className="pt-2 pl-3 text-start">대출잔액</div>
            {childDetail?.totalBalance === null ? (
              <div className="px-3 pt-4 pb-2 text-end">없어요</div>
            ) : (
              <div className="px-3 pt-4 pb-2 text-end">
                {childDetail?.loneDay || "Loading..."}
                {/* {childDetail.totalBalance} */}
              </div>
            )}
          </div>
          <div
            className="rounded-2xl drop-shadow text-xl"
            style={{ backgroundColor: "white" }}
          >
            <div className="pt-2 pl-3 text-start">대출 상환일</div>
            <div className="px-3 pt-4 pb-2 text-end">
              D - {childDetail?.loneDay || "Loading..."}
              {/* D -{childDetail.loneDay} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Total;
