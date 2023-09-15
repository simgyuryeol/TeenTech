import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { quizScoreAtom } from "../../../recoil/quizScoreAtom";



const QuizPlay: React.FC = () => {
  const navigate = useNavigate();
  const { eng } = useParams();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(
    null
  );
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const setQuizScore = useSetRecoilState(quizScoreAtom);

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

    setQuizScore(score);
    navigate("/QuizCommentary");
  };

  // 예시 데이터
  const quizzes: Quiz[] = [
    {
      question: "프랑스의 수도는 무엇인가요?",
      choices: [
        { text: "런던", correct: false },
        { text: "베를린", correct: false },
        { text: "마드리드", correct: false },
        { text: "파리", correct: true },
      ],
      explanation: "정답은 '파리'입니다. 파리는 프랑스의 수도입니다.",
    },
    {
      question: "빨간 행성으로 알려진 행성은 어떤 행성인가요?",
      choices: [
        { text: "지구", correct: false },
        { text: "화성", correct: true },
        { text: "금성", correct: false },
        { text: "목성", correct: false },
      ],
      explanation: "정답은 '화성'입니다. 화성은 빨간 행성으로 알려져 있습니다.",
    },
    {
      question: "세상에서 가장 큰 포유류는 무엇인가요?",
      choices: [
        { text: "코끼리", correct: false },
        { text: "기린", correct: false },
        { text: "고래상어", correct: false },
        { text: "블루 웨일", correct: true },
      ],
      explanation:
        "정답은 '블루 웨일'입니다. 블루 웨일은 세상에서 가장 큰 포유류입니다.",
    },
  ];

  const currentQuiz = quizzes[currentQuestionIndex];

  return (
    <div className="mt-10">
      <div className="h-5" />

      <div className="bg-white p-2 rounded-xl m-8 border-b border-grey">
        <p>{eng}</p>
        <div className="flex justify-between m-3">
          <p>{currentQuestionIndex + 1}번 문제</p>
          <p>맞힌 문제: {score}개</p>
        </div>
        <div className="p-5 font-bold">
          <p>{currentQuiz.question}</p>
        </div>
      </div>

      {!isAnswered ? (
        <div className="flex flex-col m-8">
          {currentQuiz.choices.map((choice, index) => (
            <button
              className="rounded-xl border-1 border-gray-200 px-5 py-3 text-base mb-3"
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
          {currentQuestionIndex !== 2 ? (
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
