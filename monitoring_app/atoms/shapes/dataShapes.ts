import { FeatureCollection } from "geojson";
import { atom } from "recoil";
import { geoJsonDataValues } from "@/constans/routes/GeoJsonRoutes";
import { ShapeRoute } from "@/types/shapes/shapeRoute";

const dataShapes = atom<ShapeRoute[]>({
  key: 'dataShapes',
  default: geoJsonDataValues
})

export { 
  dataShapes 
}
