from datetime import datetime
from enum import Enum
from sqlalchemy import  ForeignKey, Float, Integer, String, DateTime, Enum as SqlArchymeEnum
from app.db import db, BaseModelMixin
from sqlalchemy.orm import  mapped_column, relationship

from app.usuarios.models import Usuario

class AlertOperacionEnum(Enum):
    MY = 'MY'
    MYIG = 'MYIG'
    ME = 'ME'
    MEIG = 'MEIG'
    IG = 'IG'

class Alerta(db.Model,BaseModelMixin):
    __tablename__ = 'alertas'

    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    nombre = mapped_column(String(40),nullable=False)
    variable = mapped_column(String(30))
    control = mapped_column(Float,nullable=False)
    operacion = mapped_column(SqlArchymeEnum(AlertOperacionEnum),nullable=False)
    created_at = mapped_column(DateTime,default=datetime.today())
    
    usuario_id = mapped_column(ForeignKey("usuarios.id"))
    usuario = relationship("Usuario",back_populates="alerta")

    nodo_id = mapped_column(ForeignKey("nodos.id"))
    nodo = relationship("Nodo",back_populates="alerta")

    alertas_detalles = relationship("AlertaDetalle",back_populates="alerta")

    def __init__(
        self,
        nombre:String,
        variable:String,
        control:Float,
        operacion:AlertOperacionEnum,
        usuario:String,
        nodo:String    
    ):
        self.nombre = nombre
        self.variable = variable
        self.control = control
        self.operacion = operacion
        self.usuario_id = usuario
        self.nodo_id = nodo

    @classmethod
    def from_alerta_string(cls, alerta_str):
        return AlertOperacionEnum[alerta_str]

    def __repr__(self):
        return f"Alerta(id={self.id},variable={self.variable},control={self.control},operacion={self.operacion},nombre={self.nombre})"
    
class AlertaDetalle(db.Model,BaseModelMixin):
    __tablename__ = 'alertas_detalles'

    id = mapped_column(Integer,primary_key=True,autoincrement=True)
    variable = mapped_column(String(30))
    control = mapped_column(Float,nullable=False)
    operacion = mapped_column(SqlArchymeEnum(AlertOperacionEnum),nullable=False)
    valor = mapped_column(Float,nullable=False)
    created_at = mapped_column(DateTime,default=datetime.today())
    
    alerta_id = mapped_column(ForeignKey("alertas.id"))
    alerta = relationship("Alerta",back_populates="alertas_detalles")

    def __repr__(self):
        return f"AlertaDetalle(id={self.id},variable={self.variable},valor={self.valor},operacion={self.operacion})"