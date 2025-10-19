import { Sensor } from "@/types/sensors"
import { BoyaInfoType } from "@/types/DataTables"

function formattedData (data:Sensor) : BoyaInfoType[]{
  const tableData : BoyaInfoType[] = data?.data.map((info)=>{
		return {
			altitud: info.geolocation.alt,
			latitud: info.geolocation.lat,
			id: info.id_registro,
			ec: info.sensors.data.ec,
			od: info.sensors.data.od,
			ph: info.sensors.data.ph,
			tds: info.sensors.data.tds,
			temp: info.sensors.data.temp,
			timestamp: info.timestamp
		}
	})
  return tableData
}

export {
  formattedData
}
