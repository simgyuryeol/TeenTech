import React, { useState, useEffect } from "react";
import Statics from "../../components/AccountBook/Statics";
import { useLocation } from "react-router-dom"; // Import useLocation
import axios from "axios";
import { childIdAtom } from "../../recoil/childIdAtom";
import { useRecoilState } from "recoil";
import Statics_month from "../../components/AccountBook/Statics_month";

const Data = [
  {
    case1: "마트",
    case2: "씨유",
    case3: -2000,
    case4: "욕구",
  },
  {
    case1: "퀴즈",
    case2: "퀴즈용돈",
    case3: 1000,
    case4: "수입",
  },
  {
    case1: "음료",
    case2: "할리스",
    case3: -5500,
    case4: "욕구",
  },
];

interface Props {
  date?: string;
}

const PaccountbookDetail: React.FC<Props> = () => {
  const location = useLocation();
  const date = location.state?.date;
  const spendingAmount = location.state?.spendingAmount;
  const importAmount = location.state?.importAmount;
  const [Datedata, setDatedata] = useState([]);
  const [childId] = useRecoilState(childIdAtom);
  console.log("몇일이야??");
  console.log(date?.toString());
  const getDetail = () => {
    axios
      .get(
        `https://j9e207.p.ssafy.io/api/v1/${childId.id}/accountbooks/detail/${date}`
      )
      .then((response) => {
        setDatedata(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div className="pt-8">
      <div style={{ width: "100%", paddingTop: "60px" }}>
        <div className="text-3xl">{date}</div>
        <Statics
          spendingAmount={spendingAmount}
          importAmount={importAmount}
          date={location.state.date}
        />
      </div>
      <div className="bg-white m-4 text-xl">
        <div
          className="bg-pink-500 mt-3 mb-3"
          style={{
            width: "100%",
            height: "1px",
          }}
        ></div>
        <div className="flex text-black justify-around">
          <div>카테고리</div>
          <div>내용</div>
          <div>금액</div>
          <div>유형</div>
        </div>
        <div className="pb-3">
          {Datedata.map((item, index) => (
            <div key={index} className="m-2 flex justify-around text-black">
              <div>{item.assetType}</div>
              <div>{item.content}</div>
              {item.depositAmount > 0 ? (
                <div className="text-blue-500">{item.depositAmount}</div>
              ) : (
                <div className="text-red-500">{item.withdrawalAmount}</div>
              )}
              {item.consumptionType === null ? (
                <div>x</div>
              ) : (
                <div>{item.consumptionType}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaccountbookDetail;
