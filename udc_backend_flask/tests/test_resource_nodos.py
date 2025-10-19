from datetime import datetime, timedelta, timezone
import unittest
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_testing import TestCase
import jwt
from app import db
from app.nodos.models import DatoNodo, Nodo, CuerpoAgua
from app.nodos.api_v1.resources import DatoNodoListResource, NodoResource, NodoListResource, CuerpoAguaResource, CuerpoAguaListResource
from app.usuarios.models import Usuario




class MyTestCaseNodos(TestCase):
  

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
        user = Usuario(id="test",email='test@example.com', passwd='123456789', nombres='Test', apellidos='User', role='manager')
        db.session.add(user)

        cuerpo_agua = CuerpoAgua(id=100,nombre="Test Cuerpo Agua", descripcion="Description", latitud=10.0, longitud=20.0, usuario_id=user.id)
        db.session.add(cuerpo_agua)

        nodo = Nodo(id="nodo1", aplicacion_id="16d6bfab-8f74-4f20-9ce6-38ca7dcee151", nombre="Prueba Nodo",
                    descripcion="Description", latitud=10.0, longitud=20.0, cuerpo_agua_id=cuerpo_agua.id, usuario_id=user.id)
        db.session.add(nodo)

        dato_nodo = DatoNodo(
                fecha_dato=datetime.strptime('2023-08-04 23:00:00.000', '%Y-%m-%d %H:%M:%S.%f'),
                temperatura=20.018,
                ph=8.176,
                turbidez=2.068,
                oxigeno_disuelto=7.422,
                conductividad=53.262,
                ltd=10.3189234,
                lgn=-75.41198,
                solido_disuelto=10,
                nodo=nodo.id
            )
        db.session.add(dato_nodo)
        db.session.commit()

    def no_op_decorator(f):
        def wrapped(*args, **kwargs):
            print("Decorator is bypassed")
            return f(*args, **kwargs)
        return wrapped   

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

 
    def test_post_cuerpo_agua(self):
        # Crear Cuerpos de Aguas
        # Generar token simulado
        token = self.generate_mocked_token()

        # Encabezados con el token
        headers = {
            "Authorization": f"Bearer {token}"
        }
        data = {
            "nombre": "Test Cuerpo",
            "descripcion": "Description",
            "latitud": 10.0,
            "longitud": 20.0,
        }
        response = self.client.post('/api/v1/nodo/cuerpoagua', json=data, headers=headers)
        self.assert_status(response,201)
        self.assertIn("nombre", response.json)
        self.assertEqual(response.json['nombre'], "Test Cuerpo")

    def test_put_cuerpo_agua(self):
       #Actualizar Cuerpos de Aguas
        data = {
            "nombre": "Updated Cuerpo Agua"
        }
        # Generar token simulado
        token = self.generate_mocked_token()

        # Encabezados con el token
        headers = {
            "Authorization": f"Bearer {token}"
        }
        response = self.client.put('/api/v1/nodo/cuerpoagua/100', json=data, headers=headers)
        self.assertStatus(response,201)
        self.assertIn("nombre", response.json)
        self.assertEqual(response.json['nombre'], "Updated Cuerpo Agua")

    def test_get_cuerpo_agua(self):
        # Generar token simulado
        token = self.generate_mocked_token()

        # Encabezados con el token
        headers = {
            "Authorization": f"Bearer {token}"
        }
        response = self.client.get('/api/v1/nodo/cuerpoagua', headers=headers)
        self.assert200(response)
        self.assertIsInstance(response.json, list)


    def test_get_dato_nodo(self):
        # Example test for GET request to DatoNodoListResource
        # Generar token simulado
        token = self.generate_mocked_token()

        # Encabezados con el token
        headers = {
            "Authorization": f"Bearer {token}"
        }
        response = self.client.get('/api/v1/nodo/datonodo', headers=headers)
        self.assert200(response)
        self.assertIsInstance(response.json, list)
        

   
    def test_post_nodo(self):
        # Example test for POST request to NodoListResource
        # Generar token simulado
        token = self.generate_mocked_token()

        # Encabezados con el token
        headers = {
            "Authorization": f"Bearer {token}"
        }
        data = {
            "id": "nodo2",
            "aplicacion_id": "16d6bfab-8f74-4f20-9ce6-38ca7dcee151",
            "nombre": "Test Nodo",
            "descripcion": "Description",
            "latitud": 10.0,
            "longitud": 20.0,
            "cuerpo_agua_id": 100
        }
        response = self.client.post('/api/v1/nodo/nodo', json=data, headers=headers)
        self.assertStatus(response,201)
        self.assertIn("nombre", response.json)
        self.assertEqual(response.json['nombre'], "Test Nodo")

    
    def test_get_nodo(self):
        # Example test for GET request to NodoResource
        # Generar token simulado
        token = self.generate_mocked_token()

        # Encabezados con el token
        headers = {
            "Authorization": f"Bearer {token}"
        }
        response = self.client.get('/api/v1/nodo/nodo/nodo1',headers=headers)
        self.assert200(response)
        self.assertIn("nombre", response.json)
        self.assertEqual(response.json['nombre'], "Prueba Nodo")

    
    

    # Add more tests as needed

if __name__ == '__main__':
    unittest.main()
