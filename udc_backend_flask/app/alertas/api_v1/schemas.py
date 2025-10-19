from marshmallow import fields
from marshmallow_sqlalchemy.fields import Nested

from app.alertas.models import Alerta, AlertaDetalle
from app.ext import ma

from app.nodos.api_v1.schemas import NodoSchema
from app.usuarios.api_v1.schemas import UsuarioSchema

class AlertaSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Alerta
        include_fk = True
    
    id = ma.auto_field()
    nombre =  ma.auto_field()
    variable =  ma.auto_field()
    control =  ma.auto_field()
    operacion = fields.Method("get_operacion_as_str","set_operacion_from_str")
    nodo_id =  ma.auto_field()
    usuario = Nested(UsuarioSchema)
    nodo = Nested(NodoSchema)

    def get_operacion_as_str(self, obj):
        return obj.operacion.name if obj.operacion else None  # Devuelve el nombre del Enum como cadena

    def set_operacion_from_str(self, value):
        # Convierta el campo 'role' de cadena a Enum
        return Alerta.from_alerta_string(value)


class alertaDetalleSchema(ma.SQLAlchemySchema):
    class Meta:
        model = AlertaDetalle
    
    id = ma.auto_field()
    variable =  ma.auto_field()
    control =  ma.auto_field()
    operacion = ma.auto_field()
    valor = ma.auto_field()
    alerta_id = ma.auto_field() 