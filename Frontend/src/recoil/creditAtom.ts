import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export interface Credit {
  credit: number;
  depositinterest: number;
  loaninterest: number;
}

export const CreditAtom = atom<Credit>({
  key: "CreditAtom",
  default: {
    credit: 0,
    depositinterest: 0,
    loaninterest: 0,
  },
  effects_UNSTABLE: [persistAtom],
});