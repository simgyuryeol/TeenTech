import React from "react";
import Statics from "../../../components/AccountBook/Statics";
import AccountBotton from "../../../components/AccountBook/AccountButton";
import { useLocation } from "react-router-dom"; // Import useLocation
import imcome from "../../../assets/accountBook/income.png";
import desire from "../../../assets/accountBook/desire.png";
import need from "../../../assets/accountBook/need.png";

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
  const date = location.state.date;

  return (
    <div
      className="pt-8 pb-5"
      style={{ height: "100%", backgroundColor: "#f6f6f6" }}
    >
      <div style={{ width: "100%", paddingTop: "60px" }}>
        <div className="text-2xl">{date}</div>
        <Statics />
      </div>
      <AccountBotton date={date} />
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
          <div className="flex items-center">
            <img src={imcome} style={{ width: "35px" }} />
            <div className="ml-2 text-xl text-green-500">수입</div>
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
        {Data.map((item, index) => {
          let icon;
          let color;
          switch (item.case4) {
            case "욕구":
              icon = desire;
              color = "text-red-500";
              break;
            case "필요":
              icon = need;
              color = "text-blue-500";
              break;
            default:
              icon = imcome;
              color = "text-green-500";
          }

          return (
            <div
              className="mx-5 my-3 py-2 flex justify-between text-black"
              key={index}
            >
              {icon && (
                <img src={icon} alt={item.case4} style={{ width: "35px" }} />
              )}
              <div>{item.case1}</div>
              <div>{item.case2}</div>
              <div className={`${color}`}>{item.case3}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccountBookDetail;
