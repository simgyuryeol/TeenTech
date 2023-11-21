import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export interface teen9 {
  avatarImageUrl: string;
}

export const teen9Atom = atom<teen9>({
  key: "teenAtom",
  default: { avatarImageUrl: "" }, // 기본값 설정
  effects_UNSTABLE: [persistAtom],
});
