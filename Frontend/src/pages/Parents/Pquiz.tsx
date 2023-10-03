import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizChart from "../../components/Quiz/QuizChart";
import SetQuizPrize from "../../components/PQuiz/SetQuizPrize";
import { useRecoilValue } from "recoil";
import { quizScoreAtom } from "../../recoil/quizScoreAtom";

const Pquiz: React.FC = () => {
  const quizScore = useRecoilValue(quizScoreAtom);
  const [solved, setSolved] = useState(false);
  const [correctProblem, setCorrectProblem] = useState(0);
  const [wrongProblem, setWrongProblem] = useState(0);
  const [totalPoint, setTotalPoint] = useState(0);

  useEffect(() => {
    if (quizScore !== null) {
      setSolved(true);
    }
  }, [quizScore]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BASE_URL + "/api/v1/34/quizzes/histories")
      .then((response) => {
        const fetchedData = response.data.data;
        setCorrectProblem(fetchedData.correctProblem);
        setWrongProblem(fetchedData.wrongProblem);
        setTotalPoint(fetchedData.totalPoint);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-12">
      <p className="font-bold texl-lg">부모 퀴즈 페이지</p>

      <div className="bg-white m-5 rounded-xl p-3 flex items-center">
      <QuizChart
            correctProblem={correctProblem}
            wrongProblem={wrongProblem}
          />
        <div className="flex flex-col">
          <p>해결 문제: {correctProblem}</p>
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
            <p>총합: {totalPoint}원</p>
          </div>
        </div>
      </div>
      <SetQuizPrize />
    </div>
  );
};

export default Pquiz;
