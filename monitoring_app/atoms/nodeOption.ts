import { InfoNodo } from "@/types/nodos";
import { atom } from "recoil";

const nodeOption = atom<InfoNodo | undefined>({
  key: 'nodeOption',
  default: undefined
})

export default nodeOption
