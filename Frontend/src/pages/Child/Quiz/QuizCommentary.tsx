import React from "react";
import { useNavigate } from "react-router";
import prizeImage from "../../../assets/quiz/prize.gif";
import { useRecoilValue } from "recoil";
import { quizScoreAtom } from "../../../recoil/quizScoreAtom";

const QuizCommentary: React.FC = () => {
  const score = useRecoilValue(quizScoreAtom);

  const prize = score !== null ? score * 100 : 0;
  const topic = "돈, 화폐";
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Main");
  };

  return (
    <div className="grid place-items-center h-screen ">
      <div className="mt-0 p-3 flex-col items-center justify-center">
        <div>
          <p className="text-xl">
            <span className="font-bold text-lg">{topic}</span>에 대해{" "}
            <span className="font-bold text-lg">{score}</span> 문제를 맞혔어요!
          </p>
        </div>

        <img src={prizeImage} alt="" />

        {score !== 0 ? (
          <div className="text-xl">
            <p>
              퀴즈를 맞혀 상금{" "}
              <span className="font-bold text-lg text-yellow-500">{prize}</span>
              원을 얻었어요.
              <br />
              내일 새로운 문제로 다시 만나요!
            </p>
          </div>
        ) : (
          <div className="text-xl">
            <p>
              상금을 얻지 못했어요.
              <br />
              내일 새로운 문제로 다시 도전해보아요!
            </p>
          </div>
        )}

        <button className="mt-6 bg-white" onClick={handleClick}>
          메인으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default QuizCommentary;
