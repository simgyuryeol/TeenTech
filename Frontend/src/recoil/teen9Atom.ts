import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export interface teen9 {
  avatarImageUrl: string;
}

export const teen9Atom = atom<teen9>({
  // state 1 -> 부모 0 -> 자녀
  key: "teen9Atom",
  default: {
    avatarImageUrl: "Dog",
  },
  effects_UNSTABLE: [persistAtom],
});
