import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { quizScoreAtom } from "../../../recoil/quizScoreAtom";
import Card from "../../../components/Common/Card";

interface QuizData {
  answer: string;
  choice: string;
  commentary: string;
  question: string;
}

const QuizPlay: React.FC = () => {
  const navigate = useNavigate();
  const { eng } = useParams();
  const [quizSet, setQuizSet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(
    null
  );
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const setQuizScore = useSetRecoilState(quizScoreAtom);

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

  const convertToQuiz = (data: QuizData): Quiz => {
    let choices: Choice[] = [];
    const answer = data.answer;
    const choiceParts = data.choice.match(/[a-d]\.(.*?)(?=[a-d]\.|$)/g);

    if (data.choice === "a.Ob.X") {
      choices = [
        { text: "O", correct: false },
        { text: "X", correct: false },
      ];
    } else {
      choices = choiceParts.map((part) => {
        const text = part.replace(/[a-d]\./, "").trim();
        const correct = false;
        return { text, correct };
      });
    }

    switch (answer) {
      case "a":
        choices[0].correct = true;
        break;
      case "b":
        choices[1].correct = true;
        break;
      case "c":
        choices[2].correct = true;
        break;
      case "d":
        choices[3].correct = true;
        break;
      default:
        break;
    }

    const quiz: Quiz = {
      question: data.question,
      choices: choices,
      explanation: data.commentary,
    };

    return quiz;
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BASE_URL + `/api/v1/34/quizzes/solve/${eng}`)
      .then((response) => {
        const fetchedData: QuizData[] = response.data.data;
        const quiz = fetchedData.map(convertToQuiz);
        setQuizSet(quiz);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const handleChoice = (choice: Choice, index: number) => {
    if (choice.correct) {
      setScore(score + 1);
    }
    setSelectedChoiceIndex(index);

    setTimeout(() => {
      setSelectedChoiceIndex(null);
      setIsAnswered(true);
    }, 1000);
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleNextPage = () => {
    setQuizScore({ score: score, date: new Date(), topic:eng });
    navigate(`/QuizCommentary/${eng}`);
  };

  if (isLoading) {
    return <Card>뭐야</Card>;
  }

  const currentQuiz = quizSet[currentQuestionIndex];

  return (
    <div className="mt-10">
      <div className="h-5" />

      <div className="bg-white p-2 rounded-xl m-8 border-b border-grey">
        <p className="text-lg font-bold">{title}</p>
        <div className="flex justify-between m-3">
          <p>{currentQuestionIndex + 1}번 문제</p>
          <p>맞힌 문제: {score}개</p>
        </div>
        <div className="p-5 font-bold text-xl">
          <p>{currentQuiz.question}</p>
        </div>
      </div>

      {!isAnswered ? (
        <div className="flex flex-col m-8">
          {currentQuiz.choices.map((choice, index) => (
            <button
              className="rounded-xl border-1 border-gray-200 px-5 py-3 text-lg mb-3"
              key={index}
              onClick={() => handleChoice(choice, index)}
              style={{
                backgroundColor:
                  selectedChoiceIndex === index
                    ? choice.correct
                      ? "#92E3A9"
                      : "#F88484"
                    : "white",
              }}
            >
              {choice.text}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <div className="m-8 bg-white rounded-xl p-5">
            <p>{currentQuiz.explanation}</p>
          </div>
          {currentQuestionIndex !== 4 ? (
            <button onClick={handleNextQuestion}>다음 문제</button>
          ) : (
            <button onClick={handleNextPage}>결과보기</button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPlay;
