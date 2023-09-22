import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AccountBookAdd.module.css";

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
  {
    case1: "게임",
    case2: "ssafy pc",
    case3: -1100,
    case4: "욕구",
  },
];

const Data2 = [
  {
    q1: "학교 준비물이에요",
    point: 1,
  },
  {
    q1: "배가 너무 고팠어요",
    point: 1,
  },
  {
    q1: "배는 안고픈데 먹고싶었어요",
    point: 2,
  },
  {
    q1: "친구 선물이에요",
    point: 1,
  },
  {
    q1: "멋져서 / 예뻐서 샀어요",
    point: 2,
  },
  {
    q1: "필요한데 없어서 샀어요",
    point: 1,
  },
];

const AccountBookAdd: React.FC = () => {
  const [priceSum, setPriceSum] = useState(0);
  const [selectedRadio, setSelectedRadio] = useState({});

  const location = useLocation();
  const date = location.state?.date;

  useEffect(() => {
    const sum = Data.reduce((acc, item) => acc + item.case3, 0);
    setPriceSum(sum);
  }, []);

  // 라디오 버튼의 선택 핸들러 함수 추가
  const handleRadioChange = (case1, q1) => {
    setSelectedRadio({
      ...selectedRadio,
      [case1]: q1,
    });
    console.log(selectedRadio);
  };

  // 라디오 버튼의 선택된 상태를 가져오는 함수 추가
  const getSelectedRadio = (case1) => {
    return selectedRadio[case1] || "";
  };

  const navigate = useNavigate();

  const doneClick = () => {
    console.log(selectedRadio);
    navigate(`/AccountBookDetail`, { state: { date } });
  };

  return (
    <div
      className={`text-xl flex pt-20 container flex-col flex-wrap items-center`}
    >
      <div className="flex flex-col w-11/12">
        <div className="py-3 container"></div>
        <div className="items-center justify-center bg-white rounded-xl drop-shadow-lg mb-4">
          <div className={`${styles.borderBottom} p-3`}>[ {date} 수 ]</div>
          {Data.map((item, index) => (
            <div className={`${styles.borderBottom} py-3`}>
              <div key={index} className="flex justify-between py-2">
                <div className="w-1/3">{item.case1}</div>
                <div className="w-1/3">{item.case2}</div>
                <div className="w-1/3">{item.case3}</div>
              </div>
              <div className="flex flex-row flex-wrap text-start mx-5 mt-2">
                {item.case3 < 0 ? (
                  Data2.map((qitem, qindex) => (
                    <label key={qindex} className="basis-1/2 pb-3 pr-1">
                      <input
                        type="radio"
                        value={qitem.q1}
                        checked={qitem.q1 === getSelectedRadio(item.case1)}
                        onChange={() => handleRadioChange(item.case1, qitem.q1)}
                      />
                      {qitem.q1}
                    </label>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center my-3">
            <div className="w-1/3">합계</div>
            <div className="w-1/3">{priceSum}</div>
          </div>
        </div>
        <div className="justify-start">
          <button onClick={doneClick}>다 썼어요!</button>
        </div>
      </div>
    </div>
  );
};

export default AccountBookAdd;
