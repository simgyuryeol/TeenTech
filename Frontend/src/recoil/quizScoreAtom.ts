import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "quizScore",
  storage: sessionStorage,
});

export interface QuizScore {
  score: number | null;
  date: Date | null;
  topic: string | null;
}

export const quizScoreAtom = atom<QuizScore>({
  key: "quizScoreAtom",
  default: {
    score: null,
    date: null,
    topic: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export interface SolvedQuiz {
  quizId: number;
  answer: string;
}

export const solvedQuizAtom = atom<SolvedQuiz[]>({
  key: 'solvedQuizAtom',
  default: [],
  effects_UNSTABLE: [persistAtom],
})