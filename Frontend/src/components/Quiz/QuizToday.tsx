import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { quizScoreAtom } from "../../recoil/quizScoreAtom";

interface QuizTopic {
  topic: string;
}

const QuizToday: React.FC<QuizTopic> = (props) => {
  const eng = props.topic;

  const [quizScore, setQuizScore] = useRecoilState(quizScoreAtom);
  const [solved, setSolved] = useState(false);

  let title: string;
  switch (eng) {
    case "MONEY":
      title = "돈, 화폐";
      break;
    case "SAVING":
      title = "소득, 지출";
      break;
    case "INVEST":
      title = "투자, 펀드";
      break;
    case "PRICE":
      title = "물가";
      break;
    case "TAX":
      title = "세금";
      break;
    default:
      title = "";
      break;
  }

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

  return (
    <div className="bg-amber-100 m-5 rounded-xl p-4">
      <p className="font-bold text-xl">오늘 해결 현황</p>

      {solved ? (
        <div>
          <p className="text-right">주제: {title}</p>
          <div className="flex justify-between mt-2">
            <p>맞힌 문제: {quizScore.score ? quizScore.score : 0}</p>
            <p>틀린 문제: {quizScore.score ? 5 - quizScore.score : 0}</p>
          </div>
          <div className="mt-5 text-center text-lg">
            <p>오늘 퀴즈는 이미 다 풀었어요!</p>
            <p>내일 다시 도전해주세요.</p>
            <p>틀린 문제는 언젠가 퀴즈에 다시 나올지도..?</p>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-right">주제: ???</p>
          <div className="mt-5 text-center text-lg">
            <p>오늘의 퀴즈를 아직 풀지 않았어요!</p>
            <p>퀴즈를 맞히고 상금도 얻으러 가볼까요?</p>
          </div>
          <div className="mt-5">
            <Link to={`/QuizPlay/${eng}`}>
              <button className="w-48 overflow-hidden rounded-2xl bg-emerald-400 text-lg font-bold text-white">
                문제풀기
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizToday;
