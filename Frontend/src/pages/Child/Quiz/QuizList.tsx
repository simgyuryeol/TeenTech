import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import QuizChart from "../../../components/Quiz/QuizChart";
import QuizToday from "../../../components/Quiz/QuizToday";

const QuizList: React.FC = () => {
  const { eng } = useParams();
  const [correctProblem, setCorrectProblem] = useState(0);
  const [wrongProblem, setWrongProblem] = useState(0);
  const [totalPoint, setTotalPoint] = useState(0);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BASE_URL + `/api/v1/34/quizzes/${eng}`)
      .then((response) => {
        const fetchedData = response.data.data;
        console.log(fetchedData);
        setCorrectProblem(fetchedData.correctProblem);
        setWrongProblem(fetchedData.wrongProblem);
        setTotalPoint(fetchedData.totalPoint);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-10">
      <p className="text-xl pt-3">{eng}</p>
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
            <p>맞힌 문제: {correctProblem}개</p>
            <p>틀린 문제: {wrongProblem}개</p>
          </div>
          <div className="bg-gray-300 m-1 p-1 rounded-xl">
            <p>받은 포인트</p>
            <p>{totalPoint}원</p>
          </div>
        </div>
      </div>

      <QuizToday topic={eng} />
    </div>
  );
};

export default QuizList;
