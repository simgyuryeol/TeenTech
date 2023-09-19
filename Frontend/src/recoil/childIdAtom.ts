import { atom } from "recoil";

export interface Child {
  id: number;
  name: string;
}

export const childIdAtom = atom<Child>({
  key: "childIdAtom",
  default: {
    id: 0,
    name: "누구야",
  },
});
