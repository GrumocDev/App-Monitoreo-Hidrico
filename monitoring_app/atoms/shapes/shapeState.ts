import { ShapeRoute } from "@/types/shapes/shapeRoute";
import { atom } from "recoil";

const shapeState = atom<ShapeRoute[]>({
  key: 'shapeState',
  default: []
})

export { 
  shapeState 
}
