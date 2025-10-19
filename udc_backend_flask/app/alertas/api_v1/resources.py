from flask import  request, Blueprint
from flask_jwt_extended import  jwt_required, get_jwt_identity
from flask_restful import Api, Resource
from marshmallow import ValidationError
from sqlalchemy.exc import SQLAlchemyError

from app.common.error_handling import  Error400, ObjectNotFound
from app.common.decorators import role_required

from .schemas import AlertaSchema
from ..models import Alerta

alerta_v1_bp = Blueprint('alerta_v1_bp',__name__)

alerta_schema = AlertaSchema()

api = Api(alerta_v1_bp)

class AlertaResource(Resource):
    @jwt_required()
    @role_required('user')
    def post(self):
        data = request.get_json()
        try:
            
            alerta_dict = alerta_schema.load(data)

            get_alerta = Alerta.simple_filter_first(
                nodo_id=alerta_dict['nodo_id'],
                usuario_id=get_jwt_identity(),
                variable=alerta_dict['variable'],
                operacion=alerta_dict['operacion']
            )

            if get_alerta:
                return {"msg":"Alerta is exist"}, 400

            alerta = Alerta(
                nombre    = alerta_dict['nombre'],
                variable  = alerta_dict['variable'],
                control   = alerta_dict['control'],
                operacion = alerta_dict['operacion'],
                usuario   = get_jwt_identity(),
                nodo      = alerta_dict['nodo_id']
            )

            alerta.save()
        except ValidationError as err:
            raise Error400(err.messages)
        except SQLAlchemyError as errSql:
            raise Error400(errSql._message)
            

        return alerta_schema.dump(alerta), 201

api.add_resource(AlertaResource,'/api/v1/alerta',endpoint='alerta_resource')

class AlertaIdResource(Resource):
    @jwt_required()
    @role_required('user')
    def put(self,id):
        alerta = Alerta.get_by_id(id)

        if alerta is None:
            raise ObjectNotFound("Alerta con Id {} no existe".format(id))

        try:
            data = alerta_schema.load(request.get_json(), partial=True)
        except ValidationError as err:
            raise Error400(err.messages)
        
        for key, value in data.items():
            setattr(alerta, key, value)

        alerta.save()

        return alerta_schema.dump(alerta), 200
    
    def get(self,id):
        alerta = Alerta.get_by_id(id)

        if alerta is None:
            raise ObjectNotFound("Alerta con Id {} no existe".format(id))
        
        return alerta_schema.dump(alerta), 200
    
    def delete(self,id):
        alerta = Alerta.get_by_id(id)

        if alerta is None:
            raise ObjectNotFound("Alerta con Id {} no existe".format(id))
        
        Alerta.delete(id)

        return alerta_schema(alerta), 200
        
api.add_resource(AlertaIdResource,'/api/v1/alerta/<id>',endpoint='alerta_id_resource')