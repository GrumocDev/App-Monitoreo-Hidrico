from marshmallow import fields

from app.ext import ma
from app.usuarios.models import Usuario

class UsuarioSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Usuario

    id = fields.UUID(dump_only=True)
    email = ma.auto_field()
    password = ma.auto_field(load_only=True)
    nombres = ma.auto_field()
    apellidos = ma.auto_field()
    role = fields.Method("get_role_as_str","set_role_from_str")
    mqtt_key = ma.auto_field(dump_only=True)

    def get_role_as_str(self, obj):
        return obj.role.name  # Devuelve el nombre del Enum como cadena

    def set_role_from_str(self, value):
        # Convierta el campo 'role' de cadena a Enum
        return Usuario.from_role_string(value)
        
    