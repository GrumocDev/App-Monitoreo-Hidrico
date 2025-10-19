from datetime import datetime
import uuid
from flask import current_app
from numpy import integer
from sqlalchemy import ForeignKey, Integer, String,Float, DateTime
from sqlalchemy.orm import  mapped_column, relationship
from app.db import db, BaseModelMixin
from sqlalchemy.dialects.postgresql import UUID

from app.usuarios.models import Usuario

USE_SQLITE = True

class CuerpoAgua(db.Model,BaseModelMixin):
    __tablename__ = "cuerpos_aguas"

    id = mapped_column(Integer,primary_key=True,autoincrement=True)
    nombre = mapped_column(String(50),unique=True,nullable=False)
    descripcion = mapped_column(String(150),nullable=False)
    latitud = mapped_column(Float,nullable=False)
    longitud = mapped_column(Float,nullable=False)
    altitud = mapped_column(Float)
    created_at = mapped_column(DateTime,default=datetime.today())
    update_at = mapped_column(DateTime)
    
    usuario_id = mapped_column(ForeignKey("usuarios.id"))
    usuario = relationship("Usuario",back_populates="cuerpo")

    nodos = relationship("Nodo",back_populates="cuerpo_agua")

    def __init__(
            self,
            nombre:String,
            descripcion:String,
            latitud:Float,
            longitud:Float,
            usuario_id:uuid=None,
            altitud:Float=None,
            id:integer=None
            ):
        self.nombre = nombre
        self.descripcion = descripcion
        self.latitud = latitud
        self.longitud = longitud
        self.usuario_id = usuario_id
        self.altitud = altitud
        self.id = id

    def __repr__(self):
        return f'CuerpoAgua(id={self.id},nombre={self.nombre},descripcion={self.descripcion})'
    
    

class Nodo(db.Model,BaseModelMixin):
    __tablename__ = "nodos"

    id=mapped_column(String,primary_key=True,nullable=False) #devEui de chirpStack
    aplicacion_id = mapped_column(
        String(36)  if USE_SQLITE else UUID,
        nullable=False) #aplication ID de chirpStack
    nombre=mapped_column(String(50),unique=True,nullable=False)
    descripcion=mapped_column(String(150))
    latitud = mapped_column(Float,nullable=False)
    longitud = mapped_column(Float,nullable=False)
    created_at = mapped_column(DateTime,default=datetime.today())
    update_at = mapped_column(DateTime)
    
    usuario_id = mapped_column(ForeignKey("usuarios.id"))
    usuario = relationship("Usuario",back_populates="nodo")

    cuerpo_agua_id = mapped_column(ForeignKey("cuerpos_aguas.id"))
    cuerpo_agua = relationship("CuerpoAgua",back_populates="nodos")

    datos_nodos = relationship("DatoNodo",back_populates="nodo")
    alerta = relationship("Alerta",back_populates="nodo")

    def __init__(self,
                 id:String,
                 aplicacion_id:uuid,
                 nombre:String,
                 descripcion:String,
                 latitud:Float,
                 longitud:Float,
                 usuario_id:uuid,
                 cuerpo_agua_id:Integer,
                ):
        self.id=id
        self.aplicacion_id=aplicacion_id
        self.nombre=nombre
        self.descripcion=descripcion
        self.latitud=latitud
        self.longitud=longitud
        self.usuario_id=usuario_id
        self.cuerpo_agua_id=cuerpo_agua_id
        self.update_at=datetime.today()

    def __repr__(self):
        return f'Nodo(id={self.id},nombre={self.nombre},descripcion={self.descripcion})'
    
    def __str__(self):
        return f'{self.id}'
    
class DatoNodo(db.Model,BaseModelMixin):
    __tablename__ = "datos_nodos"

    id =mapped_column(Integer,primary_key=True, autoincrement=True)
    fecha_dato = mapped_column(DateTime)
    gateway_id = mapped_column(UUID)
    temperatura= mapped_column(Float)
    ph = mapped_column(Float)
    turbidez = mapped_column(Float)
    oxigeno_disuelto = mapped_column(Float)
    conductividad = mapped_column(Float)
    solido_disuelto = mapped_column(Float)
    latitud = mapped_column(Float)
    longitud = mapped_column(Float)
    created_at = mapped_column(DateTime,default=datetime.today())
    
    nodo_id= mapped_column(ForeignKey("nodos.id"))
    nodo = relationship("Nodo",back_populates="datos_nodos")

    def __init__(self,fecha_dato,temperatura,ph,turbidez,oxigeno_disuelto,conductividad,solido_disuelto,nodo,ltd,lgn):
        self.fecha_dato = fecha_dato
        self.temperatura = temperatura
        self.ph = ph
        self.turbidez = turbidez
        self.oxigeno_disuelto=oxigeno_disuelto
        self.conductividad = conductividad
        self.solido_disuelto=solido_disuelto
        self.nodo_id = nodo
        self.latitud=ltd
        self.longitud=lgn

    def __repr__(self):
        return f'DatoNodo(id={self.id},nodo_id={self.nodo_id})'
    
    def __str__(self):
        return f'{self.fecha_dato}'
    
  
  