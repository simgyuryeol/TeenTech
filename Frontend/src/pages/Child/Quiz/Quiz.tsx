import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizChart from "../../../components/Quiz/QuizChart";
import TopicList from "../../../components/Quiz/TopicList";
import { useRecoilValue, useRecoilState } from "recoil";
import { quizScoreAtom } from "../../../recoil/quizScoreAtom";
import { quizPointAtom } from "../../../recoil/quizPointAtom";

const Quiz: React.FC = () => {
  const [quizScore, setQuizScore] = useRecoilState(quizScoreAtom);
  const quizPoint = useRecoilValue(quizPointAtom);
  const [solved, setSolved] = useState(false);
  const [correctProblem, setCorrectProblem] = useState(0);
  const [wrongProblem, setWrongProblem] = useState(0);
  const [totalPoint, setTotalPoint] = useState(0);

  useEffect(() => {
    const today = new Date().toDateString();
    if (quizScore.score !== null) {
      const dateSolved = quizScore.date.toDateString();
      if (dateSolved !== today) {
        setQuizScore({
          score: null,
          date: null,
          topic: null,
        });
        return;
      }
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
      <p className="text-2xl font-bold">퀴즈</p>
      <div className="bg-white m-5 rounded-xl p-3 flex">
        {correctProblem === 0 && wrongProblem === 0 ? (
          <div className="w-48 flex justify-center items-center bg-orange-100 rounded-xl m-2">
            아직 푼 문제가 없어요.
          </div>
        ) : (
          <QuizChart
            correctProblem={correctProblem}
            wrongProblem={wrongProblem}
          />
        )}

        <div className="flex flex-col">
          <div className="bg-gray-300 m-1 p-1 rounded-xl">
            <p>오늘 맞힌 문제</p>
            {solved ? <p>{quizScore.score}/5</p> : <p>-</p>}
          </div>
          <div className="bg-gray-300 m-1 p-1 rounded-xl">
            <p>받은 포인트</p>
            {solved ? (
              <p>
                오늘: {quizScore.score ? quizScore.score * quizPoint : 0}원
              </p>
            ) : (
              <p>오늘: -</p>
            )}
            <p>총합: {totalPoint}원</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <p className="text-2xl font-bold">퀴즈 주제</p>
        <TopicList />
      </div>
    </div>
  );
};

export default Quiz;
