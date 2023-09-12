import React from "react";
import { useNavigate } from "react-router";
import prizeImage from "../../../assets/temp-prize.png";
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
    <div className="mt-12 p-3 flex-col items-center justify-center">
      <div className="w-40 ml-12">
        <img src={prizeImage} alt="" />
      </div>
      <div>
        <p>
          <strong>{topic}</strong>에 대해 <strong>{score}</strong> 문제를
          맞혔어요!
        </p>
      </div>
      {score !== 0 ? (
        <div>
          <p>
            퀴즈를 맞혀 상금 <strong>{prize}</strong>원을 얻었어요.
          </p>
          <p>내일 새로운 문제로 다시 만나요!</p>
        </div>
      ) : (
        <div>
          <p>상금을 얻지 못했어요.</p>
          <p>내일 새로운 문제로 다시 도전해보아요!</p>
        </div>
      )}

      <button className="mt-3" onClick={handleClick}>
        메인으로 돌아가기
      </button>
    </div>
  );
};

export default QuizCommentary;
