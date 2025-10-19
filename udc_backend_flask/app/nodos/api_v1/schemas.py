from marshmallow import fields

from app.ext import ma
from app.nodos.models import DatoNodo, Nodo, CuerpoAgua

class DatoNodoSchema(ma.SQLAlchemySchema):
    class Meta:
        model = DatoNodo
    
    id = ma.auto_field()
    fecha_dato = ma.auto_field()
    gateway_id = ma.auto_field()
    temperatura = ma.auto_field()
    ph = ma.auto_field()
    turbidez = ma.auto_field()
    oxigeno_disuelto = ma.auto_field()
    conductividad = ma.auto_field()
    solido_disuelto = ma.auto_field()
    created_at = ma.auto_field()
    nodo_id = ma.auto_field()
    latitud = ma.auto_field()
    longitud = ma.auto_field()


class NodoSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Nodo

    id = ma.auto_field()
    aplicacion_id = ma.auto_field()
    nombre = ma.auto_field()
    descripcion = ma.auto_field()
    latitud = ma.auto_field()
    longitud = ma.auto_field()
    created_at = ma.auto_field()
    update_at = ma.auto_field()
    usuario_id = ma.auto_field()
    cuerpo_agua_id = ma.auto_field()

class CuerpoAguaSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CuerpoAgua

    id = fields.UUID(dump_only=True)
    nombre = ma.auto_field()
    descripcion = ma.auto_field()
    latitud = ma.auto_field()
    longitud = ma.auto_field()
    created_at = ma.auto_field() 
    update_at = ma.auto_field() 
    usuario_id = ma.auto_field() 
    