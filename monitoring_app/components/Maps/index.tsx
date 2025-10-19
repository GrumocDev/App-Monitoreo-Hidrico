'use client'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, ZoomControl, GeoJSON} from 'react-leaflet'
import { useEffect } from 'react'
import useSensors from "@/hooks/sensors/useSensors";
import CustomMarker from "./components/CustomMarker";
import { useRecoilState, useRecoilValue } from "recoil";
import { shapeState } from "@/atoms/shapes/shapeState";
import { geoJsonDataValues } from "@/constans/routes/GeoJsonRoutes";
import { dataShapes } from "@/atoms/shapes/dataShapes";
import L from 'leaflet'
import { getStyle } from "@/utils/shapes/getShapeStyles";
import Legend from "./components/Legend";
import showGateways from "@/atoms/shapes/showGateways";

const Map = () => {

	const { data } = useSensors()
	const [geojsonData, setGeojsonData] = useRecoilState(dataShapes);
	const shapes = useRecoilValue(shapeState)
  const showShapeGateway = useRecoilValue(showGateways)

  const DefaultIcon = L.icon({
    iconUrl: "/marker.svg",
    shadowUrl: "/marker.svg",
  });
  
  L.Marker.prototype.options.icon = DefaultIcon;

  console.log(shapes)

  // useEffect(() => {

  //   let dataJson = {}
  //   geoJsonDataValues.map((geojson)=>{
  //     fetch(`${process.env.NEXT_PUBLIC_API_URL}${geojson.url}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         dataJson = {
  //           ...dataJson,
  //           [geojson.key]: data
  //         }
  //         setGeojsonData(dataJson)
  //         return dataJson
  //       })
  //       .catch(error => console.error('Error cargando el GeoJSON:', error));
  //   })

  // }, []);

	return (
		<div className='overflow-hidden relative flex'>
			<MapContainer
				style={{
					height: '800px',
					width: '1260px',
				}} 
				center={[10.418384, -75.523634]} 
				zoom={14}
				zoomControl={false}
				scrollWheelZoom={true}>
				<ZoomControl position="topleft" />
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
        {/* Sensores */}
				{showShapeGateway.length > 0 ? showShapeGateway?.map((sensor, i)=><CustomMarker key={i} location={sensor}/>) : null}
        {/* Leyendas */}
        {
          shapes.length > 0 || showShapeGateway.length > 0
          ?
          <div className="absolute z-[999] right-0 h-fit flex flex-col gap-4 p-4 m-2 rounded-md bg-white/80">
            {showShapeGateway.length > 0 ? <Legend name={"Gateways"}/> : null}
            {geoJsonDataValues.map((geo, i)=>{
              if(shapes.find((shape) => shape.key === geo.key)){
                return (
                  <div className="" key={i}>
                    <Legend name={geo?.key}/> 
                  </div>
                )
              }else{
                return null
              }
            })}
          </div>
          :
          null
        }
        {/* Capas de información */}
        {/* {
          shapes.map((geo, i)=>{
            if(shapes.find((shape) => shape.key === geo.key)){
              return (
                <div key={i} className="w-full h-full relative">
                  <GeoJSON attribution="Text" key={i} data={geojsonData[geo?.key]} style={(feature)=>
                  (feature, geo?.key)}/>
                </div>
              )
            }else{
              return null
            }
          })
        } */}
			</MapContainer>
		</div>
	)

}

export default Map
