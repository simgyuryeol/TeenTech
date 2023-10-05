import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import QuizChart from "../../../components/Quiz/QuizChart";
import QuizToday from "../../../components/Quiz/QuizToday";
import { childIdAtom } from "../../../recoil/childIdAtom";
import { useRecoilValue } from "recoil";

const QuizList: React.FC = () => {
  const { eng } = useParams();
  const [correctProblem, setCorrectProblem] = useState(0);
  const [wrongProblem, setWrongProblem] = useState(0);
  const [totalPoint, setTotalPoint] = useState(0);
  const child = useRecoilValue(childIdAtom)

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BASE_URL + `/api/v1/${child.id}/quizzes/${eng}`)
      .then((response) => {
        const fetchedData = response.data.data;
        console.log(fetchedData);
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
    <div className="mt-10">
      <p className="text-xl pt-3">{eng}</p>
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
          <div className="m-1 p-1">
            <p>맞힌 문제: {correctProblem}개</p>
            <p>틀린 문제: {wrongProblem}개</p>
          </div>
          <div className="m-1 p-1">
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
