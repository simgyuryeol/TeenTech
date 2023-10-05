import React, { useState, useEffect } from "react";
import Statics from "../../components/AccountBook/Statics";
import { useLocation } from "react-router-dom"; // Import useLocation
import axios from "axios";
import { childIdAtom } from "../../recoil/childIdAtom";
import { useRecoilState } from "recoil";
import Statics_month from "../../components/AccountBook/Statics_month";

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
        <div className="flex text-black">
          <div style={{ width: "25%" }}>카테고리</div>
          <div style={{ width: "25%" }}>내용</div>
          <div style={{ width: "25%" }}>금액</div>
          <div style={{ width: "25%" }}>유형</div>
        </div>
        <div className="pb-3">
          {Datedata.map((item, index) => (
            <div key={index} className="m-2 flex text-black">
              {item.assetType === "WITHDRAW" ? (
                <div className="text-red-500" style={{ width: "25%" }}>
                  소비
                </div>
              ) : (
                <div className="text-blue-500" style={{ width: "25%" }}>
                  수입
                </div>
              )}

              <div style={{ width: "25%" }}>{item.content}</div>
              {item.depositAmount > 0 ? (
                <div className="text-blue-500" style={{ width: "25%" }}>
                  {item.depositAmount.toLocaleString()}
                </div>
              ) : (
                <div className="text-red-500" style={{ width: "25%" }}>
                  {item.withdrawalAmount.toLocaleString()}
                </div>
              )}
              {item.consumptionType === null ? (
                <div style={{ width: "25%" }}>x</div>
              ) : (
                <div style={{ width: "25%" }}>{item.consumptionType}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaccountbookDetail;
