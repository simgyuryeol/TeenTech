import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export interface Child {
  id: number;
  pid: number;
  name: string;
}

export const childIdAtom = atom<Child>({
  key: "childIdAtom",
  default: {
    id: 0,
    pid: 0,
    name: "누구야",
  },
  effects_UNSTABLE: [persistAtom],
});