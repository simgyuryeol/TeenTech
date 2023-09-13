import React, { useState } from "react";
import styles from "./LottoChange.module.css";

const LottoChange: React.FC = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  // 1~6까지 숫자배열
  const availableNumbers = Array.from({ length: 6 }, (_, index) => index + 1);

  const resetClick = () => {
    setSelectedNumbers([]);
  };

  const rendomClick = () => {
    setSelectedNumbers([]);
    console.log(setSelectedNumbers.length);
    while (selectedNumbers.length < 3) {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      if (!selectedNumbers.includes(randomNum)) {
        setSelectedNumbers([...selectedNumbers, randomNum]);
      }
    }
  };

  const handleNumberClick = (number: number) => {
    if (selectedNumbers.includes(number)) {
      // 이미 선택된 숫자인 경우 선택 해제
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else if (selectedNumbers.length < 3) {
      // 아직 3개 이하의 숫자를 선택한 경우에만 추가
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  return (
    <div className="pt-16">
      <div>선택한 숫자</div>
      {selectedNumbers.length === 0 ? (
        <div>x</div>
      ) : (
        <div className="flex justify-center items-center">
          {selectedNumbers.map((number) => (
            <div
              key={number}
              className={`${styles.selectedcircle} cursor-pointer m-1 rounded-full`}
              onClick={() => handleNumberClick(number)}
            >
              {number}
            </div>
          ))}
        </div>
      )}

      <div>
        {availableNumbers.map((number) => (
          <div
            key={number}
            className="cursor-pointer m-1 rounded-full inline-block text-center"
            onClick={() => handleNumberClick(number)}
            style={{
              backgroundColor: selectedNumbers.includes(number)
                ? "lightblue"
                : "white",
              border: "1px solid #ccc",
              width: "30px",
              height: "30px",
            }}
          >
            {number}
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => resetClick()}>초기화</button>
        <button onClick={() => rendomClick()}>rendom</button>
      </div>
      <button>응모하기</button>
    </div>
  );
};

export default LottoChange;
