import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AccountBookAdd.module.css";
import axios from "axios";
import { childIdAtom } from "../../../recoil/childIdAtom";
import { useRecoilState } from "recoil";

const Data2 = [
  {
    q1: "밥",
    point: "필요소비",
  },
  {
    q1: "간식",
    point: "욕구소비",
  },
  {
    q1: "준비물",
    point: "필요소비",
  },
  {
    q1: "장난감",
    point: "욕구소비",
  },
  {
    q1: "게임",
    point: "욕구소비",
  },
  {
    q1: "선물",
    point: "필요소비",
  },
];

interface SelectedItem {
  [key: number]: {
    accountBookId: number;
    consumptionType: string;
    content: string;
  };
}

const AccountBookAdd: React.FC = () => {
  const [childId] = useRecoilState(childIdAtom);
  const [priceSum, setPriceSum] = useState(0);
  const [selectedRadio, setSelectedRadio] = useState<SelectedItem>({});

  const [isOpen, setIsOpen] = useState({});

  const toggleDropdown = (index) => {
    setIsOpen({
      ...isOpen,
      [index]: !isOpen[index],
    });
  };

  const handleItemClick = (id, point, q1) => {
    setSelectedRadio({
      ...selectedRadio,
      [id]: { accountBookId: id, consumptionType: point, content: q1 },
    });

    setIsOpen({}); // 드롭다운 닫기
  };

  const location = useLocation();
  const date = location.state?.date;
  const total = location.state?.total;
  const spendingAmount = location.state?.spendingAmount;
  const importAmount = location.state?.importAmount;

  const [Datedata, setDatedata] = useState([]);

  const getData = () => {
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
    getData();
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
    console.log(selectedRadio);

    // 다 체크했는지 아닌지 확인
    const allSelected = Datedata.every((item) =>
      item.assetType === "WITHDRAW" && item.consumptionType === null
        ? selectedRadio[item.accountBookId] !== undefined
        : true
    );

    console.log(selectedRadio);

    if (!allSelected) {
      alert("아직 안 쓴 부분이 있어요~");
      return;
    }

    // selectedRadio의 모든 값을 배열로 가져옴
    const selectedValues = Object.values(selectedRadio);

    // Promise.all을 사용하여 모든 요청이 완료될 때까지 기다림
    Promise.all(
      selectedValues.map((item) =>
        axios.post(
          `https://j9e207.p.ssafy.io/api/v1/${childId.id}/accountbooks`,
          {
            accountBookId: item.accountBookId,
            consumptionType: item.consumptionType,
          }
        )
      )
    )
      .then(() => {
        alert("오늘 가계부 쓰기 완료!" + " 참 잘했어요!");
      })
      .catch((error) => {
        console.log(error);
      });

    navigate(`/AccountBookDetail`, {
      state: { date, spendingAmount, importAmount },
    });
  };

  return (
    <div
      style={{ width: "100%", minHeight: "100vh", backgroundColor: "#f6f6f6" }}
      className={`text-xl flex pt-20 container flex-col flex-wrap items-center`}
    >
      <div className="flex flex-col w-11/12">
        <div className="py-3 container"></div>
        <div className="items-center justify-center bg-white rounded-xl drop-shadow-lg mb-4">
          <div className={`${styles.borderBottom} p-3`}>[ {date} ]</div>
          {Datedata.map((item, index) => (
            <div key={index} className={`${styles.borderBottom} py-3`}>
              <div className="flex justify-between py-2">
                {item.assetType === "WITHDRAW" ? (
                  <div className="w-1/3">소비</div>
                ) : (
                  <div className="w-1/3">소득</div>
                )}

                <div className="w-1/3">{item.content}</div>
                {item.depositAmount > 0 && (
                  <div className="w-1/3 text-green-600">
                    {item.depositAmount}
                  </div>
                )}
                {item.withdrawalAmount > 0 && (
                  <div className="w-1/3 text-red-600">
                    {item.withdrawalAmount}
                  </div>
                )}
              </div>

              {item.assetType === "WITHDRAW" &&
              item.withdrawalAmount > 0 &&
              item.content != "투자 소비" &&
              item.content != "대출" ? (
                <>
                  <button
                    className="bg-white-300 dropdown mt-2 drop-shadow-md text-lg"
                    onClick={() => toggleDropdown(index)}
                    style={{ width: "240px", height: "55px" }}
                  >
                    {selectedRadio[item.accountBookId]?.content
                      ? `${selectedRadio[item.accountBookId].content}에 썼어요`
                      : "어디에다 쓴 돈이에요?"}
                  </button>
                  {isOpen[index] &&
                    Data2.map((qItem, qIndex) => (
                      <div
                        key={qIndex}
                        className="p-2 rounded-sm"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleItemClick(
                            item.accountBookId,
                            qItem.point,
                            qItem.q1
                          )
                        }
                      >
                        {qItem.q1}
                      </div>
                    ))}
                </>
              ) : null}
            </div>
          ))}
          <div className="flex justify-between items-center my-3">
            <div className="w-1/3">합계</div>
            <div
              className={`w-1/3 ${
                total > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {total}
            </div>
          </div>
        </div>
        <div className="justify-start drop-shadow-md rounded-sm">
          <button onClick={doneClick}>다 썼어요!</button>
        </div>
      </div>
    </div>
  );
};

export default AccountBookAdd;
