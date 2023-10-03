import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export interface state {
  id: number;
}

export const stateAtom = atom<state>({
  // state 1 -> 부모 0 -> 자녀
  key: "stateAtom",
  default: {
    id: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
