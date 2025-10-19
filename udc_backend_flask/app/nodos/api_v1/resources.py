import uuid
from flask import  request, Blueprint
from flask_restful import Api, Resource
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import SQLAlchemyError

from app import db
from app.common.error_handling import  Error400, ObjectNotFound
from app.common.decorators import role_required

from .schemas import CuerpoAguaSchema, DatoNodoSchema, NodoSchema
from ..models import DatoNodo, Nodo, CuerpoAgua

nodo_v1_bp = Blueprint('nodo_v1_bp',__name__)

datoNodo_schema = DatoNodoSchema()
nodo_schema = NodoSchema()
cuerpoagua_schema = CuerpoAguaSchema()

api = Api(nodo_v1_bp)


class DatoNodoListResource(Resource):
    
    def get(self):
        datonodo = DatoNodo.get_all()
                
        result = datoNodo_schema.dump(datonodo,many=True)
        return result

api.add_resource(DatoNodoListResource,'/api/v1/nodo/datonodo',endpoint='dato_nodo_list_resource')

class DatoNodoResource(Resource):
    
    def get(self,id):
        query = DatoNodo.query.filter(DatoNodo.nodo_id == id)
        datonodo = query.all()


        result = datoNodo_schema.dump(datonodo,many=True)
        return result

api.add_resource(DatoNodoResource,'/api/v1/nodo/datonodo/<id>',endpoint='dato_nodo_resource')

class DatoNodoLastResource(Resource):
    
    def get(self,id):
        query = DatoNodo.query.filter(DatoNodo.nodo_id == id)
        datonodo = query.order_by(DatoNodo.fecha_dato.desc()).first()

        result = datoNodo_schema.dump(datonodo)
        return result

api.add_resource(DatoNodoLastResource,'/api/v1/nodo/datonodo/last/<id>',endpoint='dato_nodo_last_resource')

class NodoResource(Resource):
    
    def get(self,id):
        nodo = Nodo.get_by_id(id)

        if nodo is None:
            raise ObjectNotFound("El nodo con ID {} No existe".format(id))
               
        return nodo_schema.dump(nodo),200
    
    @jwt_required()
    @role_required('manager')
    def put(self,id):
        nodo = Nodo.get_by_id(id)

        if nodo is None:
            raise ObjectNotFound("El nodo con ID {} No existe".format(id))
        
        try:
            data = nodo_schema.load(request.get_json(), partial=True)
        except ValidationError as err:
            raise Error400(err.messages)

        for key, value in data.items():
            setattr(nodo, key, value)

        db.session.commit()
        
        return nodo_schema.dump(nodo),201

class NodoListResource(Resource):
    
    def get(self):
        nodo = Nodo.get_all()
               
        result = nodo_schema.dump(nodo,many=True)
        return result
    
    @jwt_required()
    @role_required('manager')
    def post(self):
        data = request.get_json()
        try:
            nodo_dict = nodo_schema.load(data)
            nodo = Nodo(
                        id=nodo_dict['id'],
                        aplicacion_id=nodo_dict['aplicacion_id'],
                        nombre=nodo_dict['nombre'],
                        descripcion=nodo_dict['descripcion'],
                        latitud=nodo_dict['latitud'],
                        longitud=nodo_dict['longitud'],
                        usuario_id= get_jwt_identity(),
                        cuerpo_agua_id=nodo_dict['cuerpo_agua_id'],
            )

            nodo.save()
        except ValidationError as err:
            raise Error400(err.messages)
        except SQLAlchemyError as errSql:
            raise Error400(errSql._message)   
         
        return nodo_schema.dump(nodo), 201

api.add_resource(NodoResource,'/api/v1/nodo/nodo/<id>',endpoint='nodo_resource')
api.add_resource(NodoListResource,'/api/v1/nodo/nodo',endpoint='nodo_list_resource')

class CuerpoAguaResource(Resource):
    
    def get(self,id):
        cuerpo_agua = CuerpoAgua.get_by_id(id)
        if cuerpo_agua is None:
           return {"message": "Cuerpo Agua not found"}, 404
        
        result = cuerpoagua_schema.dump(cuerpo_agua)
        return result
    
    @jwt_required()
    @role_required('manager')
    def put(self,id):
        
        
        cuerpo_agua = CuerpoAgua.get_by_id(id)

        if cuerpo_agua is None:
            raise ObjectNotFound("ID {} no encontrado".format(id))
        
        try:
            data = cuerpoagua_schema.load(request.get_json(),partial=True)
        except ValidationError as err:
            raise Error400(err.messages)

        for key, value in data.items():
            setattr(cuerpo_agua, key, value)

        db.session.commit()
        
        return cuerpoagua_schema.dump(cuerpo_agua),201


class CuerpoAguaListResource(Resource):
    
    def get(self):
        cuerpo_agua = CuerpoAgua.get_all()
        if cuerpo_agua is None:
           return {"message": "Cuerpo Agua not found"}, 404
        
        result = cuerpoagua_schema.dump(cuerpo_agua,many=True)
        return result
    
    @jwt_required()
    @role_required('manager')
    def post(self):
        data = request.get_json()

        try:
            cp_dict = cuerpoagua_schema.load(data)
            cp = CuerpoAgua (
                nombre=cp_dict['nombre'],
                descripcion=cp_dict['descripcion'],
                latitud=cp_dict['latitud'],
                longitud=cp_dict['longitud'],
                usuario_id=get_jwt_identity()
            )
            cp.save()
        except ValidationError as err:
            raise  ObjectNotFound(err.messages)
         
        resp = cuerpoagua_schema.dump(cp)
        return resp, 201    

api.add_resource(CuerpoAguaResource,'/api/v1/nodo/cuerpoagua/<id>',endpoint='cuerpoagua_list_resource')
api.add_resource(CuerpoAguaListResource,'/api/v1/nodo/cuerpoagua',endpoint='cuerpoagua_resource')