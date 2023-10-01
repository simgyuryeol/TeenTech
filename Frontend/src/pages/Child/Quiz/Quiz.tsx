import React, { useState, useEffect } from "react";
import axios from "axios";
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

  useEffect(() => {
    axios
      // .get(import.meta.env.VITE_BASE_URL + `/api/v1/${child_id}/investments`, {
      .get(import.meta.env.VITE_BASE_URL + "/api/v1/34/quizzes/histories")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-12">
      <p className="text-2xl font-bold">퀴즈</p>
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

      <div className="mt-12">
        <p className="text-2xl font-bold">퀴즈 주제</p>
        <TopicList />
      </div>
    </div>
  );
};

export default Quiz;
