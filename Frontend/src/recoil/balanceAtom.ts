import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export interface money {
  totalBalance: number;
}

export const balanceAtom = atom<money>({
  key: "balanceAtom",
  default: {
    totalBalance: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
