import React from "react";
import { useParams } from "react-router-dom";
import QuizChart from "../../../components/Quiz/QuizChart";
import QuizToday from "../../../components/Quiz/QuizToday";

const QuizList: React.FC = () => {
  const { eng } = useParams();

  return (
    <div className="mt-10">
      <p className="text-xl pt-3">{eng}</p>
      <div className="bg-white m-5 rounded-xl p-3 flex">
        <QuizChart />
        <div className="flex flex-col">
          <div className="bg-gray-300 m-1 p-1 rounded-xl">
            <p>맞힌 문제: 13</p>
            <p>틀린 문제: 2</p>
          </div>
          <div className="bg-gray-300 m-1 p-1 rounded-xl">
            <p>받은 포인트</p>
            <p>1300원</p>
          </div>
        </div>
      </div>

      <QuizToday topic={eng}/>
    </div>
  );
};

export default QuizList;
