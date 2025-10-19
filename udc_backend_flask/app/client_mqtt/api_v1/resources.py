import json

from flask import render_template
from app import mqtt as mqtt_client
from flask_mail import Message

from app.alertas.models import Alerta
from app.nodos.models import DatoNodo

from app.alertas.api_v1.schemas import AlertaSchema
from app.nodos.api_v1.schemas import DatoNodoSchema

from app import mail
from datetime import datetime

def init_mqtt_handler(app):
    @mqtt_client.on_connect()
    def handle_connect(cliente, userdata, flags, rc):
        if rc == 0:
            app.logger.info("connectado a mqtt")
            mqtt_client.subscribe('application/device/event/up')
        else:
            print('Error:',rc)

    @mqtt_client.on_message()
    def handle_mqtt_message(client, userdata, message):
        with app.app_context():
            datoNodoSchema = DatoNodoSchema()
            try:
                data_mqtt = json.loads(message.payload.decode())
            except Exception as e:
                return 
            #if len(data_mqtt.get('object',{}).get('mensaje')) == 0:
            #    return

            #variables= json.loads(data_mqtt.get('object',{}).get('mensaje').replace('\u0000',''))
            data = DatoNodo(   
                fecha_dato= datetime.now().strftime("%Y-%m-%d %H:%M:%S"),#data_mqtt.get('time',None),
                nodo='8a4081c6374dc036',#'8a4081c6374dc036',#data_mqtt.get('deviceInfo',{}).get('devEui',None),
                temperatura=data_mqtt.get('temp'),#variables.get('temp',None),
                ph=data_mqtt.get('ph'),#variables.get('ph',None),
                turbidez=data_mqtt.get('tur'),#variables.get('tur',None),
                oxigeno_disuelto=data_mqtt.get('od'),#variables.get('od',None),
                conductividad=data_mqtt.get('con'),#variables.get('con',None),
                solido_disuelto=data_mqtt.get('tds'),#variables.get('tds',None),
                ltd=data_mqtt.get('lat'),#variables.get('gps',{}).get('lat',None),
                lgn=data_mqtt.get('lng'),#variables.get('gps',{}).get('lng',None),
            )
            data.save()
            mqtt_client.publish('aplication/pub/nodo/dato',datoNodoSchema.dumps(data))

            #alertas = Alerta.simple_filter(nodo_id='8a4081c6374dc036')#'8a4081c6374dc036')#data_mqtt.get('deviceInfo',{}).get('devEui'))
            #alertas_schema = AlertaSchema(many=True)
            #if alertas:
            #    verificar_alertas(data,alertas_schema.dump(alertas,many=True))

    def verificar_alertas(dato_nodo, alertas):
        # Mapeo de operaciones
        operaciones = {
            'MY': lambda x, y: x > y,
            'MYIG': lambda x, y: x >= y,
            'ME': lambda x, y: x < y,
            'MEIG': lambda x, y: x <= y,
            'IG': lambda x, y: x == y
        }

        # Variables en el modelo DatoNodo
        variables_dato_nodo = {
            'temperatura': dato_nodo.temperatura,
            'ph': dato_nodo.ph,
            'turbidez': dato_nodo.turbidez,
            'oxigeno_disuelto': dato_nodo.oxigeno_disuelto,
            'conductividad': dato_nodo.conductividad,
            'solido_disuelto': dato_nodo.solido_disuelto,
        }

    
        # Verificar cada alerta
        for alerta in alertas:
            variable = alerta["variable"]
            control = alerta["control"]
            operacion = alerta["operacion"]

            # Si la variable de la alerta existe en el modelo DatoNodo
            if variable in variables_dato_nodo:
                valor_dato_nodo = variables_dato_nodo[variable]

                # Verificar si el valor no es None
                if valor_dato_nodo is not None:
                    # Ejecutar la operación
                    if operacion in operaciones:
                        if operaciones[operacion](valor_dato_nodo, control):
                            print(alerta)
                            enviar_alerta_por_correo(alerta,valor_dato_nodo)
    

    def enviar_alerta_por_correo(alerta,valor_recibido):
        with app.app_context():
            operaciones_dict ={
                "MY"   :'Mayor que',
                "MYIG" : 'Mayor o Igual a',
                "ME"   : 'Menor que',
                "MEIG" : 'Menor o Igual a',
                "IG"   : 'Igual a'

            }
            msg = Message('Alerta Activada Proyecto UDC Water', 
                          recipients=[alerta["usuario"]["email"]])
            msg.html = render_template('alert_email.html',alerta=alerta, operaciones=operaciones_dict,valor=valor_recibido)
            mail.send(msg)
         
        
