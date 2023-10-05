import React, { useEffect, useState } from "react";
import Statics from "../../../components/AccountBook/Statics";
import AccountBotton from "../../../components/AccountBook/AccountButton";
import { useLocation } from "react-router-dom"; // Import useLocation
import imcome from "../../../assets/accountBook/income.png";
import desire from "../../../assets/accountBook/desire.png";
import need from "../../../assets/accountBook/need.png";
import question from "../../../assets/accountBook/question.png";
import axios from "axios";
import { childIdAtom } from "../../../recoil/childIdAtom";
import { useRecoilState } from "recoil";

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
    case1: "문구",
    case2: "문구나라",
    case3: -5500,
    case4: "필요",
  },
];

interface Props {
  date?: string;
}

const AccountBookDetail: React.FC<Props> = () => {
  const location = useLocation();
  const date = location.state?.date;
  const spendingAmount = location.state?.spendingAmount;
  const importAmount = location.state?.importAmount;
  const total = importAmount - spendingAmount;
  const [Datedata, setDatedata] = useState([]);
  // 필요, 욕구 소비 체크 다 되어있는지 확인 ( 0이면 수정, 1이면 쓰기 )
  const [buttonState, setButtonState] = useState(0);
  const [childId] = useRecoilState(childIdAtom);

  const getDetail = () => {
    console.log("가계부 디테일 : ");
    setDatedata([]);
    axios
      .get(
        `https://j9e207.p.ssafy.io/api/v1/${childId.id}/accountbooks/detail/${date}`
      )
      .then((response) => {
        setDatedata(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDetail();
  }, []);

  useEffect(() => {
    // Datedata 배열의 각 요소를 검사하여 "소비" 타입인데 "욕구"나 "필요"가 아닌 요소가 있는지 확인
    const hasUnspecifiedConsumptionType = Datedata.some(
      (item) =>
        item.assetType === "WITHDRAW" &&
        item.consumptionType !== "욕구소비" &&
        item.consumptionType !== "필요소비"
    );

    // 해당하는 요소가 있다면 buttonState를 1로 설정
    if (hasUnspecifiedConsumptionType) {
      setButtonState(1);
    } else {
      setButtonState(0);
    }
  }, [Datedata]);

  return (
    <div
      className="pt-8 pb-10"
      style={{ width: "100%", minHeight: "100vh", backgroundColor: "#f6f6f6" }}
    >
      <div style={{ width: "100%", paddingTop: "60px" }}>
        <div className="text-2xl">{date}</div>
        <Statics
          spendingAmount={spendingAmount}
          importAmount={importAmount}
          date={location.state.date}
        />
      </div>
      <AccountBotton
        date={date}
        total={total}
        spendingAmount={spendingAmount}
        importAmount={importAmount}
        buttonState={buttonState}
      />
      <div
        className="text-xl rounded-xl m-3 pb-1 drop-shadow-lg	"
        style={{ backgroundColor: "white" }}
      >
        <div className="flex p-3 ml-2">
          <div className="flex items-center mr-3">
            <img src={desire} style={{ width: "35px" }} />
            <div className="ml-2 text-xl text-red-500">욕구</div>
          </div>
          <div className="flex items-center mr-3">
            <img src={need} style={{ width: "35px" }} />
            <div className="ml-2 text-xl text-blue-500">필요</div>
          </div>
          <div className="flex items-center mr-3">
            <img src={imcome} style={{ width: "35px" }} />
            <div className="ml-2 text-xl text-green-500">수입</div>
          </div>
          <div className="flex items-center">
            <img src={question} style={{ width: "35px" }} />
            <div className="ml-2 text-xl text-black-500">?</div>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: "1.5px",
            backgroundColor: "pink",
            marginBottom: "10px",
          }}
        ></div>
        {Datedata.map((item, index) => {
          let icon;
          let color;
          let money;
          if (item.depositAmount > 0) {
            icon = imcome;
            color = "text-green-500";
            money = item.depositAmount;
          } else if (item.withdrawalAmount > 0) {
            if (item.assetType === "WITHDRAW") {
              switch (item.consumptionType) {
                case "욕구소비":
                  icon = desire;
                  break;
                case "필요소비":
                  icon = need;
                  break;
                default:
                  icon = question;
              }
              color = "text-red-500";
              money = item.withdrawalAmount;
            } else if (item.content === "투자 소비") {
              icon = need;
              color = "text-red-500";
              money = item.withdrawalAmount;
            } else if (item.content === "예금 가입") {
              icon = need;
              color = "text-red-500";
              money = item.withdrawalAmount;
            } else if (item.content === "투자") {
              icon = need;
              color = "text-red-500";
              money = item.withdrawalAmount;
            }
          }

          return (
            <div
              className="mx-5 my-3 py-2 flex justify-between text-black"
              key={index}
            >
              {icon && (
                <img src={icon} alt={item.case4} style={{ width: "35px" }} />
              )}
              <div>{item.assetType}</div>
              <div>{item.content}</div>
              <div className={`${color}`}>{money}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccountBookDetail;
