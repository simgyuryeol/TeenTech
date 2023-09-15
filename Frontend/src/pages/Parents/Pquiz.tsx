import React, { useState, useEffect } from "react";
import QuizChart from "../../components/Quiz/QuizChart";
import SetQuizPrize from "../../components/PQuiz/SetQuizPrize";
import { useRecoilValue } from "recoil";
import { quizScoreAtom } from "../../recoil/quizScoreAtom";

const Pquiz: React.FC = () => {
  const quizScore = useRecoilValue(quizScoreAtom);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    if (quizScore !== null) {
      setSolved(true);
    }
  }, [quizScore]);

  return (
    <div className="mt-12">
      <p className="font-bold texl-lg">부모 퀴즈 페이지</p>

      <div className="bg-white m-5 rounded-xl p-3 flex items-center">
        <QuizChart />
        <div className="flex flex-col">
          <p>해결 문제: 20</p>
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
      <SetQuizPrize />
    </div>
  );
};

export default Pquiz;
