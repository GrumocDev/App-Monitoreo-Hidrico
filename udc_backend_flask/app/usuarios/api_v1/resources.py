from flask import  jsonify, request, Blueprint
from flask_jwt_extended import create_access_token, jwt_required
from flask_restful import Api, Resource
from marshmallow import ValidationError
from sqlalchemy.exc import SQLAlchemyError

from app.common.error_handling import  Error400, ObjectNotFound
from app.common.decorators import role_required

from .schemas import UsuarioSchema
from ..models import Usuario

user_v1_bp = Blueprint('user_v1_bp',__name__)

user_schema = UsuarioSchema()

api = Api(user_v1_bp)

class UserResource(Resource):
    """Creacion de Usuarios

    Args:
        Resource (POST): Creacion de nuevo usuario

    Raises:
        Error400: Validacion de datos
        Error400: Validacion de primary key e index

    Returns:
        Usuario: Modelo Usuario
    """
    
    def post(self):
        data = request.get_json()
        try:
            
            user_dict = user_schema.load(data)
            user = Usuario(
                email=user_dict['email'],
                passwd=user_dict['password'],
                nombres=user_dict['nombres'],
                apellidos=user_dict['apellidos'],
                role=user_dict['role'],
               
            )

            user.save()
        except ValidationError as err:
            raise Error400(err.messages)
        except SQLAlchemyError as errSql:
            raise Error400(errSql._message)
            

        return user_schema.dump(user), 201
    
    """Consulta de Todos de Usuarios

    Args:
        Resource (GET): Consultar Todos los Usuarios

   
    Returns:
        Usuario: Modelo Usuario
    """
    @jwt_required()
    @role_required('admin')
    def get(self):
        data = Usuario.get_all()

        return user_schema.dump(data,many=True)

class UserActionResource(Resource):    
    @jwt_required()
    @role_required('admin')
    def put(self,id):
        user = Usuario.get_by_id(id)

        if user is None:
            raise ObjectNotFound("Usuario con Id {} no existe".format(id))
        
        try:
            data = user_schema.load(request.get_json(), partial=True)
        except ValidationError as err:
            raise Error400(err.messages)
        
        for key, value in data.items():
            if key == "password":
                value = Usuario.generate_password(value)

            setattr(user, key, value)

        user.save()

        return user_schema.dump(user), 200
    
api.add_resource(UserResource,'/api/v1/user',endpoint='user_resource')
api.add_resource(UserActionResource,'/api/v1/user/<id>',endpoint='user_action_resource')

class UserLoginResource(Resource):
    def post(self):
        data = request.get_json()
        user = Usuario.simple_filter_first(email=data.get('email'),estado='activo')

        if not user or not user.check_password(data.get('password')):
            return {'msg': 'Credenciales Invalidas'}, 401
        
        dataUser = user_schema.dump(user)
        
        access_token = create_access_token(
            identity=dataUser['id'],
            additional_claims={
                'email':dataUser['email'],
                'role':dataUser['role'],
                'mqtt_key':dataUser['mqtt_key']
            }
            )
        
        return {'access_token':access_token}, 200

api.add_resource(UserLoginResource,'/api/v1/login',endpoint='user_login_resource')