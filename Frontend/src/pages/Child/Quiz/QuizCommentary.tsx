import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import prizeImage from "../../../assets/quiz/prize.gif";
import { useRecoilValue } from "recoil";
import { quizScoreAtom, solvedQuizAtom } from "../../../recoil/quizScoreAtom";
import { quizPointAtom } from "../../../recoil/quizPointAtom";
import { SolvedQuiz } from "../../../recoil/quizScoreAtom";
import { childIdAtom } from "../../../recoil/childIdAtom";

const QuizCommentary: React.FC = () => {
  const { eng } = useParams();
  const navigate = useNavigate();
  const child = useRecoilValue(childIdAtom);
  const quizScore = useRecoilValue(quizScoreAtom);
  const quizPoint = useRecoilValue(quizPointAtom);
  const solvedQuiz = useRecoilValue(solvedQuizAtom);

  const prize = quizScore.score !== null ? quizScore.score * quizPoint : 0;

  let topic: string;
  switch (eng) {
    case "MONEY":
      topic = "돈, 화폐";
      break;
    case "SAVING":
      topic = "소득, 지출";
      break;
    case "INVEST":
      topic = "투자, 펀드";
      break;
    case "PRICE":
      topic = "물가";
      break;
    case "TAX":
      topic = "세금";
      break;
    default:
      topic = "";
      break;
  }

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    axios
      .post(import.meta.env.VITE_BASE_URL + `/api/v1/${child.id}/quizzes`, {
        quiz: solvedQuiz,
        subject: eng,
        date: formattedDate,
      })
      .then((response) => {
        const fetchedData = response.data.data;
        console.log(fetchedData);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  const handleClick = () => {
    navigate("/Main");
  };

  return (
    <div className="grid place-items-center h-screen ">
      <div className="mt-0 p-3 flex-col items-center justify-center">
        <div>
          <p className="text-xl">
            <span className="font-bold text-lg">{topic}</span>에 대해{" "}
            <span className="font-bold text-lg">{quizScore.score}</span> 문제를 맞혔어요!
          </p>
        </div>

        <img src={prizeImage} alt="" />

        {quizScore.score !== 0 ? (
          <div className="text-xl">
            <p>
              퀴즈를 맞혀 상금{" "}
              <span className="font-bold text-lg text-yellow-500">{prize}</span>
              원을 얻었어요.
              <br />
              내일 새로운 문제로 다시 만나요!
            </p>
          </div>
        ) : (
          <div className="text-xl">
            <p>
              상금을 얻지 못했어요.
              <br />
              내일 새로운 문제로 다시 도전해보아요!
            </p>
          </div>
        )}

        <button className="mt-6 bg-bgblue" onClick={handleClick}>
          메인으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default QuizCommentary;
