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

type Status = "PRE" | "ING" | "TRUE" | "FALSE"

interface Job {
  albaId: number;
  childId: number;
  title: string;
  content: string;
  reward: number;
  startDate: Date;
  closeDate: Date;
  status: Status;
}