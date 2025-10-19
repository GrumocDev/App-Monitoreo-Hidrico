from enum import Enum
import secrets
import string
import uuid

from sqlalchemy import String, UUID, DateTime, Enum as SqlArchemyEnum
from sqlalchemy.orm import mapped_column, relationship
from app.db import db, BaseModelMixin

from app.ext import bcrypt

USE_SQLITE = True

class UserRoleEnum(Enum):
    admin = "admin"
    user = "user"
    manager = "manager"

class UserStatusEnum(Enum):
    activo = "activo"
    inactivo = "inactivo"


class Usuario(db.Model, BaseModelMixin):
    __tablename__ = "usuarios"

    id = mapped_column(
         String(36)  if USE_SQLITE else UUID, primary_key=True, default=lambda:str(uuid.uuid4()) if USE_SQLITE else uuid.uuid4)
    email = mapped_column(String(50), unique=True, nullable=False)
    password = mapped_column(String(300), nullable=False)
    mqtt_key = mapped_column(String(300), nullable=False)  # Llave para permite la conexion al Broker
    nombres = mapped_column(String(200), nullable=False)
    apellidos = mapped_column(String(200), nullable=False)
    verified_check = mapped_column(DateTime)  # Columna que estable si se aceptaron los terminos
    refresh_token = mapped_column(String(400))
    role = mapped_column(SqlArchemyEnum(UserRoleEnum), nullable=False,default='user')
    estado = mapped_column(SqlArchemyEnum(UserStatusEnum), nullable=False, default='activo')

    alerta = relationship("Alerta", back_populates="usuario")
    cuerpo = relationship("CuerpoAgua", back_populates="usuario")
    nodo = relationship("Nodo", back_populates="usuario")

    def __init__(
            self, 
            email:String, 
            passwd:String, 
            nombres:String, 
            apellidos:String, 
            role:UserRoleEnum, 
            estado:String='activo', 
            id = None
            ):
        self.email = email
        self.password = self.generate_password(passwd)
        self.nombres = nombres
        self.apellidos = apellidos
        self.role = role
        self.estado= UserStatusEnum[estado]
        self.mqtt_key = self.generar_cadena_aleatoria()
        self.id = id

    @staticmethod
    def generar_cadena_aleatoria(longitud=12):
        caracteres = string.ascii_letters + string.digits
        return ''.join(secrets.choice(caracteres) for _ in range(longitud))
    
    @classmethod
    def from_role_string(cls, role_str):
        return UserRoleEnum[role_str]  

    @staticmethod
    def generate_password(password):
        return bcrypt.generate_password_hash(password).decode("utf-8")
        

    def check_password(self, passwd):
        return bcrypt.check_password_hash(self.password, passwd)

    def __repr__(self):
        return f"Usuario (email={self.email}, id={self.id},role={self.role},nombres={self.nombres},apellidos={self.apellidos},"
