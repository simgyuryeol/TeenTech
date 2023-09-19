import { atom } from "recoil";

export interface state {
  id: number;
}

export const stateAtom = atom<state>({
  key: "stateAtom",
  default: {
    id: 0,
  },
});
