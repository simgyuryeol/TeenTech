import { atom } from "recoil";

export interface money {
  totalBalance: number;
}

export const balanceAtom = atom<money>({
  key: "balanceAtom",
  default: {
    totalBalance: 0,
  },
});
