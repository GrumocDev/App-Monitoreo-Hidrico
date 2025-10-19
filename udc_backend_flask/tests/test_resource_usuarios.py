from datetime import datetime, timedelta, timezone
import json
import unittest
from unittest.mock import patch 
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_testing import TestCase
import jwt
from app import db
from app.nodos.models import DatoNodo, Nodo, CuerpoAgua
from app.nodos.api_v1.resources import DatoNodoListResource, NodoResource, NodoListResource, CuerpoAguaResource, CuerpoAguaListResource
from app.usuarios.api_v1.resources import UserActionResource, UserLoginResource, UserResource
from app.usuarios.models import Usuario




class MyTestCaseUser(TestCase):
    
    def create_app(self):
        app = Flask(__name__)
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        app.config['JWT_SECRET_KEY'] = 'yrOXvrIkyfJezp4m4UoN6lMmSpZ1fapw'  # Configura la clave secreta para JWT
        app.config['JWT_TOKEN_LOCATION'] = ['headers']  # Configura la ubicación del token JWT
        app.config['JWT_HEADER_NAME'] = 'Authorization'
        app.config['JWT_HEADER_TYPE'] = 'Bearer'

        db.init_app(app)

        # Inicializa JWTManager
        JWTManager(app)

        self.app = app
        # Initialize your API
        api = Api(app)
        
        api.add_resource(UserLoginResource,'/api/v1/login')
        api.add_resource(UserResource,'/api/v1/user')
        api.add_resource(UserActionResource,'/api/v1/user/<id>')

        
        return app

    def setUp(self):
        with self.app.app_context():
            db.create_all()
            self.create_test_data()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()        

    def create_test_data(self):
        """Crea datos iniciales para las pruebas."""
        user = Usuario(id="test",email='test@example.com', passwd='123456789', nombres='Test', apellidos='User', role='admin')
        db.session.add(user)
        db.session.commit()

    def generate_mocked_token(self):
        
        payload = {
            "sub": "test",  # Identificador del usuario
            "exp": datetime.now(timezone.utc) + timedelta(hours=1),  # Tiempo de expiración
            "iat": datetime.now(timezone.utc),  # Tiempo de emisión
            "role": "manager"  # Información adicional si es requerida
        }

        # Generar el token JWT firmado
        token = jwt.encode(payload,'yrOXvrIkyfJezp4m4UoN6lMmSpZ1fapw',algorithm="HS256")
        return token
    
    def test_post_usuario(self):
        data = {
            "email":'test@alltime.com',
            "nombres":"test",
            "apellidos":"testing",
            "password":"abc1234hytr",
            "role":"admin"
        }

        response = self.client.post('/api/v1/user',json=data)
        self.assertStatus(response,201)
        self.assertIn('role',response.json)
        self.assertEqual(response.json['role'], "admin")

    def test_login_usuario(self):
            data = {
                "email":'test@example.com',
                "password":"123456789",
            }

            response = self.client.post('/api/v1/login',json=data)
            self.assertStatus(response,200)
            self.assertIn('access_token',response.json)
    
    def test_no_login_usuario(self):
        data = {
            "email":'test@alltime.com',
            "password":"abc1234hytr",
        }

        response = self.client.post('/api/v1/login',json=data)
        self.assertStatus(response,401)
        self.assertIn('msg',response.json)
        self.assertEqual(response.json['msg'], "Credenciales Invalidas")