import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();


export const myStocksAtom = atom<StockBought[]>({
  key: "myStocksAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});