from datetime import datetime, timedelta, timezone
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
from app.usuarios.models import Usuario




class MyTestCaseAlertas(TestCase):
    
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
        api.add_resource(DatoNodoListResource, '/api/v1/nodo/datonodo')
        api.add_resource(NodoResource, '/api/v1/nodo/nodo/<id>')
        api.add_resource(NodoListResource, '/api/v1/nodo/nodo')
        api.add_resource(CuerpoAguaResource, '/api/v1/nodo/cuerpoagua/<id>')
        api.add_resource(CuerpoAguaListResource, '/api/v1/nodo/cuerpoagua')

        
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