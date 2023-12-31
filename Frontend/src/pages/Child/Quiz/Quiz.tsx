import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizChart from "../../../components/Quiz/QuizChart";
import TopicList from "../../../components/Quiz/TopicList";
import { useRecoilValue, useRecoilState } from "recoil";
import { quizScoreAtom } from "../../../recoil/quizScoreAtom";
import { quizPointAtom } from "../../../recoil/quizPointAtom";
import { childIdAtom } from "../../../recoil/childIdAtom";

const Quiz: React.FC = () => {
  const [quizScore, setQuizScore] = useRecoilState(quizScoreAtom);
  const quizPoint = useRecoilValue(quizPointAtom);
  const child = useRecoilValue(childIdAtom);
  const [solved, setSolved] = useState(false);
  const [correctProblem, setCorrectProblem] = useState(0);
  const [wrongProblem, setWrongProblem] = useState(0);
  const [totalPoint, setTotalPoint] = useState(0);

  useEffect(() => {
    const today = new Date().toDateString();
    console.log("Quiz Score for today:", quizScore);
    if (quizScore.score !== null && quizScore.date instanceof Date) {
      console.log("here", quizScore.date)
      const dateSolved = quizScore.date.toDateString();
      if (dateSolved !== today) {
        setQuizScore({
          score: null,
          date: null,
          topic: null,
        });
        return;
      }
    }
    setSolved(true);
  }, []);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BASE_URL + `/api/v1/${child.id}/quizzes/histories`)
      .then((response) => {
        const fetchedData = response.data.data;
        setCorrectProblem(fetchedData.correctProblem);
        setWrongProblem(fetchedData.wrongProblem);
        setTotalPoint(fetchedData.point);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }, []);

  return (
    <div className="mt-12">
      <p className="text-2xl font-bold">퀴즈</p>
      <div className="bg-rose-100 m-5 rounded-xl p-3 flex">
        {correctProblem === 0 && wrongProblem === 0 ? (
          <div className="w-48 flex justify-center items-center bg-white rounded-xl m-2">
            아직 푼 문제가 없어요.
          </div>
        ) : (
          <QuizChart
            correctProblem={correctProblem}
            wrongProblem={wrongProblem}
          />
        )}

        <div className="flex flex-col ml-2">
          <div className="m-1">
            <p className="font-bold text-lg">오늘 맞힌 문제</p>
            {solved ? <p>{quizScore.score}/5</p> : <p>-</p>}
          </div>
          <div className="m-1 p-1">
            <p className="font-bold text-lg">받은 포인트</p>
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

      <div className="mt-8 py-4 m-5 bg-amber-100 rounded-xl">
        <p className="text-2xl font-bold ">퀴즈 주제</p>
        <TopicList />
      </div>
    </div>
  );
};

export default Quiz;
