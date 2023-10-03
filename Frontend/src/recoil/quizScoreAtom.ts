import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "quizScore",
  storage: localStorage,
});

export const quizScoreAtom = atom<number | null>({
  key: "quizScoreAtom",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
