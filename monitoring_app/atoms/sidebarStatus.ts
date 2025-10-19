import { atom } from "recoil";
import { sidebarOptions } from "../types/sidebarOptions";

const sidebarStatus = atom<sidebarOptions>({
  key: 'sidebarStatus',
  default: 'info'
})

export default sidebarStatus
