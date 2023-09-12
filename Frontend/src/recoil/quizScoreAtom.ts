import { atom } from "recoil";

export const quizScoreAtom = atom<number | null>({
    key: "quizScoreAtom",
    default: null,
});