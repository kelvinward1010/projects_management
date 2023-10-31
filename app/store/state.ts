import { selector } from "recoil";
import { 
    dataCompletionProject 
} from "./atom";


export const dataCompletionPj: any = selector({
    key: "dataCompletionPj",
    get: ({ get }) => {
      const dataPj = get(dataCompletionProject);
      return dataPj;
    },
});