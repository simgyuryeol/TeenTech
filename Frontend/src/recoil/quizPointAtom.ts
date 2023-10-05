import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

// export interface money {
//   quizPoint: number;
// }

export const quizPointAtom = atom<number>({
  key: "quizPointAtom",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
