import React, { useState, useEffect } from "react";
import QuizChart from "../../../components/Quiz/QuizChart";
import TopicList from "../../../components/Quiz/TopicList";
import { useRecoilValue } from "recoil";
import { quizScoreAtom } from "../../../recoil/quizScoreAtom";

const Quiz: React.FC = () => {
  const quizScore = useRecoilValue(quizScoreAtom);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    if (quizScore !== null) {
      setSolved(true);
    }
  }, [quizScore]);

  return (
    <div className="mt-10">
      <p className="text-xl font-bold">자식 퀴즈 페이지</p>
      <div className="bg-white m-5 rounded-xl p-3 flex">
        <QuizChart />
        <div className="flex flex-col">
          <div className="bg-gray-300 m-1 p-1 rounded-xl">
            <p>오늘 맞힌 문제</p>
            {solved ? <p>{quizScore}/3</p> : <p>-</p>}
          </div>
          <div className="bg-gray-300 m-1 p-1 rounded-xl">
            <p>받은 포인트</p>
            {solved ? (
              <p>오늘: {quizScore ? quizScore * 100 : 0}원</p>
            ) : (
              <p>오늘: -</p>
            )}
            <p>총합: 5000원</p>
          </div>
        </div>
      </div>
      <div>
        <TopicList />
      </div>
    </div>
  );
};

export default Quiz;
