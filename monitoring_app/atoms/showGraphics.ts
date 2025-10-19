import { atom } from "recoil";

const showGraphics = atom<boolean>({
  key: 'showGraphics',
  default: false
})

export default showGraphics
