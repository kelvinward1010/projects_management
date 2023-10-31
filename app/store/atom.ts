import { atom } from "recoil";

export const dataCompletionProject = atom<any[]>({
  key: "dataCompletionProject",
  default: [],
});