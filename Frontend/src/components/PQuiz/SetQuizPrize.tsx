import React, { useState } from "react";
import Card from "../Common/Card";

const SetQuizPrize: React.FC = () => {
  const [prize, setPrize] = useState(0);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (!newValue) {
      setPrize(0);
      return;
    }

    const parsedValue = parseFloat(newValue);
    setPrize(parsedValue);
  };

  const handleSet = () => {
    console.log(`퀴즈 상금 등록: ${prize}원`);
  };

  return (
    <Card>
      <p className="font-bold text-lg">퀴즈 상금 설정</p>

      <div className="flex items-center justify-between px-4 pt-4">
        <p>퀴즈 상금(1문제당)</p>
        <div className="flex items-center">
          <input
            type="number"
            id="quantity"
            value={prize}
            onChange={handleQuantityChange}
            className="w-20 px-3 py-1 text-xl font-bold text-right border border-gray-300 rounded-lg"
          />
          <p className="ml-1 text-xl font-bold text-right">원</p>
        </div>
      </div>
      <p className="text-sm text-right pr-4 text-gray-500">최대 500원</p>

      <button onClick={handleSet} className="m-4">
        등록하기
      </button>
    </Card>
  );
};

export default SetQuizPrize;
