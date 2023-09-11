import React, {useState} from "react";

interface Choice {
	text: string;
	correct: boolean;
}

interface Quiz {
  question: string;
  choices: Choice[];
}


const QuizPlay: React.FC<{Quizzes: Quiz[]}> = (props) => {
  const quizzes = props
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  return (
    <div className="mt-10">
      {/* 퀴즈 풀기 */}
      <h2>퀴즈 풀기</h2>
      <p>문제 번호</p>
      <p>획득점수</p>

      {/* 문제 */}
      <p>문제</p>

      {/* 보기 */}
      <div>
        <button>보기1</button>
        <button>보기2</button>
        <button>보기3</button>
        <button>보기4</button>
      </div>

      {/* 퀴즈 해설 */}
      <h2>퀴즈 해설</h2>

    </div>
  );
};

export default QuizPlay;
