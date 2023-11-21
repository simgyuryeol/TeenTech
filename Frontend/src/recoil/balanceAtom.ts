import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();


export const balanceAtom = atom<number>({
  key: "balanceAtom",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
