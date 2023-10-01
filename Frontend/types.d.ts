interface News {
  title: string;
  content: string;
  newsDate: string;
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

interface TradingRecord {
  date: Date;
  type: number;
  companyName: string;
  amount: number;
  price: number;
}

interface StockBought {
  companyName: string;
  averagePrice: number;
  amount: number;
  investment: number;
  value: number;
  gain: number;
  ror: number;
}