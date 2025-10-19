import { DataNodo, InfoNodo } from "@/types/nodos";
import { atom } from "recoil";

const showGateways = atom<InfoNodo[]>({
  key: 'showGateways',
  default: []
})

export default showGateways
