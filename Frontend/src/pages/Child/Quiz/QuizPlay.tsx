import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { childIdAtom } from "../../../recoil/childIdAtom";
import { quizScoreAtom } from "../../../recoil/quizScoreAtom";
import { solvedQuizAtom } from "../../../recoil/quizScoreAtom";
import Card from "../../../components/Common/Card";

interface QuizData {
  quizId: number;
  answer: string;
  choice: string;
  commentary: string;
  question: string;
}

interface SolveData {
  quizId: number;
  answer: string;
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
  const child = useRecoilValue(childIdAtom);
  const [solvedQuizzes, setSolvedQuizzes] = useRecoilState(solvedQuizAtom);

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
    const id = data.quizId
    const choiceParts = data.choice.match(/[a-d]\.(.*?)(?=[a-d]\.|$)/g);

    if (data.choice === "a.Ob.X") {
      choices = [
        { id: id, text: "O", correct: false },
        { id: id, text: "X", correct: false },
      ];
    } else {
      choices = choiceParts.map((part) => {
        const text = part.replace(/[a-d]\./, "").trim();
        const correct = false;
        return { id, text, correct };
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
      id: id,
      question: data.question,
      choices: choices,
      explanation: data.commentary,
    };

    return quiz;
  };

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BASE_URL +
          `/api/v1/${child.id}/quizzes/solve/${eng}`
      )
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

    let answer: string;
    switch (index) {
      case 0:
        answer = "a";
        break;
      case 1:
        answer = "b";
        break;
      case 2:
        answer = "c";
        break;
      case 3:
        answer = "d";
        break;
      default:
        break;
    }
    const currentQuizId = currentQuiz.quizId;
    console.log("current: ", currentQuizId);
    setSolvedQuizzes((prev) => [
      ...prev,
      {
        quizId: choice.id,
        answer: answer,
      },
    ]);

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
    setQuizScore({ score: score, date: new Date(), topic: eng });
    
    console.log(solvedQuizzes);
    navigate(`/QuizCommentary/${eng}`);
  };

  if (isLoading) {
    return <Card>로딩 중</Card>;
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
