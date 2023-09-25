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
    q1: "밥",
    point: 1,
  },
  {
    q1: "간식",
    point: 1,
  },
  {
    q1: "준비물",
    point: 2,
  },
  {
    q1: "장난감",
    point: 1,
  },
  {
    q1: "게임",
    point: 2,
  },
  {
    q1: "선물",
    point: 1,
  },
];

const AccountBookAdd: React.FC = () => {
  const [priceSum, setPriceSum] = useState(0);
  const [selectedRadio, setSelectedRadio] = useState({});

  const [isOpen, setIsOpen] = useState({});

  const toggleDropdown = (index) => {
    setIsOpen({
      ...isOpen,
      [index]: !isOpen[index],
    });
  };

  const handleItemClick = (case1, q1) => {
    setSelectedRadio({
      ...selectedRadio,
      [case1]: q1,
    });
    setIsOpen({}); // Close all dropdowns
  };

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
  };

  // 라디오 버튼의 선택된 상태를 가져오는 함수 추가
  const getSelectedRadio = (case1) => {
    return selectedRadio[case1] || "";
  };

  const navigate = useNavigate();

  const doneClick = () => {
    // 다 체크했는지 아닌지 확인
    const allSelected = Data.every((item) =>
      item.case3 < 0 ? selectedRadio[item.case1] !== undefined : true
    );

    if (!allSelected) {
      alert("아직 안 쓴 부분이 있어요~");
      return;
    }

    alert("오늘 가계부 쓰기 완료!" + " 참 잘했어요!");
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
                <div
                  className={`w-1/3 ${
                    item.case3 < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {item.case3}
                </div>
              </div>

              {item.case3 < 0 ? (
                <>
                  <button
                    className="bg-white-300 dropdown mt-2 drop-shadow-md"
                    onClick={() => toggleDropdown(index)}
                    style={{ width: "240px", height: "50px" }}
                  >
                    {selectedRadio[item.case1]
                      ? selectedRadio[item.case1] + "에 썼어요"
                      : "어디에다 쓴 돈이에요?"}
                  </button>
                  {isOpen[index] &&
                    Data2.map((qItem, qIndex) => (
                      <div
                        key={qIndex}
                        className="p-2 rounded-sm"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleItemClick(item.case1, qItem.q1)}
                      >
                        {/* <input
                          type="radio"
                          value={qItem.q1}
                          checked={getSelectedRadio(item.case1) === qItem.q1}
                          onChange={() => {
                            handleRadioChange(item.case1, qItem.q1);
                            setIsOpen(false);
                          }}
                        /> */}
                        {qItem.q1}
                      </div>
                    ))}
                </>
              ) : null}
            </div>
          ))}
          <div className="flex justify-between items-center my-3">
            <div className="w-1/3">합계</div>
            <div className="w-1/3">{priceSum}</div>
          </div>
        </div>
        <div className="justify-start drop-shadow-md rounded-sm">
          <button
            onClick={doneClick}
            // style={{ backgroundColor: "#7B78FF", color: "white" }}
          >
            다 썼어요!
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountBookAdd;
