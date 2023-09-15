interface News {
  title: string;
  content: string;
  date: string;
}

interface Choice {
  text: string;
  correct: boolean;
}

interface Quiz {
  question: string;
  choices: Choice[];
  explanation: string;
}
