import React, { useState } from "react";
import axios from "axios";
import Card from "../Common/Card";
import { quizPointAtom } from "../../recoil/quizPointAtom";
import { childIdAtom } from "../../recoil/childIdAtom";
import { useRecoilState, useRecoilValue } from "recoil";

const SetQuizPrize: React.FC = () => {
  const [prize, setPrize] = useRecoilState(quizPointAtom);
  const prizeToString: string = "현재 상금" + prize.toString();
  const child = useRecoilValue(childIdAtom);

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
    axios
      .post(
        import.meta.env.VITE_BASE_URL +
          `/api/v1/${child.id}/quizzes/reward/set`,
        {
          cost: prize,
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("퀴즈 상금을 저장했어요.");
      })
      .catch((error) => {
        console.log(error);
        alert("다시 시도해주세요.");
      });
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
            placeholder={prizeToString}
          />
          <p className="ml-1 text-xl font-bold text-right">원</p>
        </div>
      </div>
      <p className="text-sm text-right pr-4 text-gray-500">최대 500원</p>

      <button
        onClick={handleSet}
        className={`m-4 ${
          prize === 0 || prize > 500 ? "bg-gray-200" : "bg-blue-300"
        }`}
        disabled={prize === 0 || prize > 500}
      >
        등록하기
      </button>
    </Card>
  );
};

export default SetQuizPrize;
