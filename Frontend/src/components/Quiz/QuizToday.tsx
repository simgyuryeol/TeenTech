import React from "react";
import { Link } from "react-router-dom";

interface QuizTopic {
  topic?: string;
}

const QuizToday: React.FC<QuizTopic> = (props) => {
  const eng = props.topic;
  //   const solved = true;
  const solved = false;

  return (
    <div className="bg-white m-5 rounded-xl p-4">
      <p className="font-bold text-lg">오늘 해결 현황</p>

      {solved ? (
        <div>
          <p className="text-right">주제: 물가</p>
          <div className="flex justify-between mt-2">
            <p>맞힌 문제: 4</p>
            <p>틀린 문제: 1</p>
          </div>
          <div className="mt-5 text-left">
            <p>오늘 퀴즈는 이미 다 풀었어요!</p>
            <p>내일 다시 도전해주세요.</p>
            <p>틀린 문제는 언젠가 퀴즈에 다시 나올지도..?</p>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-right">주제: ???</p>
          <div className="mt-5 text-left">
            <p>오늘의 퀴즈를 아직 풀지 않았어요!</p>
            <p>퀴즈를 맞히고 상금도 얻으러 가볼까요?</p>
          </div>
          <div className="mt-5">
            <Link to={`/QuizPlay/${eng}`}>
              <button className="w-48 overflow-hidden rounded-2xl bg-green-400 text-lg font-bold text-white">
                문제풀기
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizToday;
