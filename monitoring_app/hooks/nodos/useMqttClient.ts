import { useEffect, useState } from 'react'
import mqtt from 'mqtt/dist/mqtt.esm'

export function useMqttClient<T = any>(brokerUrl: string = "", topic: string = "") {
  const [message, setMessage] = useState<T | null>(null)

  useEffect(() => {
    const client = mqtt.connect(brokerUrl)

    client.on('connect', () => {
      console.log(`Conectado al broker MQTT en ${brokerUrl}`)
      client.subscribe(topic, (err) => {
        if (!err) console.log(`Conectado al topic ${topic}`)
        if (err) console.error(`Error al suscribirse al topic`, err)
      })
    })

    client.on('message', (receivedTopic, payload) => {
      if (receivedTopic === topic) {
        try {
          const parsed = JSON.parse(payload.toString())
          setMessage(parsed)
	  console.log(parsed)
        } catch (error) {
          console.error('Error al parsear mensaje MQTT:', error)
        }
      }
    })

    client.on('error', (err) => {
      console.error('Error de conexión MQTT:', err)
    })

    return () => {
      client.end(true)
    }
  }, [brokerUrl, topic])

  return message
}
