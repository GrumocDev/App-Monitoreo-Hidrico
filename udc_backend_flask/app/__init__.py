import os
from flask import Flask, jsonify, make_response, send_from_directory
import logging
from flask_cors import CORS

from flask_restful import Api
from  app.db import db
from .ext import ma, migrate,mqtt, jwt, bcrypt, mail

from app.client_mqtt.api_v1.resources import init_mqtt_handler
from app.nodos.api_v1.resources import nodo_v1_bp
from app.usuarios.api_v1.resources import user_v1_bp
from app.alertas.api_v1.resources import alerta_v1_bp
from app.analisis_datos.api_v1.resources import analisis_v1_bp

from app.common.error_handling import Error400, ObjectNotFound, AppErrorBaseClass


def create_app(settings_module):

    app = Flask(__name__)
    app.config.from_object(settings_module)

    CORS(app)
    
    #Ruta estatica para archivos geojson
    @app.route('/api/v1/geojson/<path:filename>')
    def server_geojson(filename):
        return send_from_directory('./static/geojson', filename)
    
    # Inicializa las extensiones
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db, compare_type=True,render_as_batch=True)
    mqtt.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    mail.init_app(app)
    
    with app.app_context():
        init_mqtt_handler(app)

    # Captura todos los errores 404
    Api(app, catch_all_404s=True)

    # Deshabilita el modo estricto de acabado de una URL con /
    app.url_map.strict_slashes = False

    # Registra los blueprints
    app.register_blueprint(nodo_v1_bp)
    app.register_blueprint(user_v1_bp)
    app.register_blueprint(alerta_v1_bp)
    app.register_blueprint(analisis_v1_bp)


    # Registra manejadores de errores personalizados
    register_error_handlers(app)

     # Configura logs a archivo y consola
    if not os.path.exists('logs'):
        os.makedirs('logs')

    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

    file_handler = logging.FileHandler('logs/app.log')
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(formatter)

    stream_handler = logging.StreamHandler()
    stream_handler.setLevel(logging.INFO)
    stream_handler.setFormatter(formatter)

    app.logger.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    app.logger.addHandler(stream_handler)

    # También para otros módulos
    logging.getLogger().setLevel(logging.INFO)
    logging.getLogger().addHandler(file_handler)
    logging.getLogger().addHandler(stream_handler)

    app.logger.info("Flask app initialized")

    return app


def register_error_handlers(app):
    logging.basicConfig(level=logging.ERROR, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    logger = logging.getLogger(__name__)

    @app.errorhandler(Exception)
    def handle_exception_error(e):
        logger.error(f"Se produjo una excepción: {e}", exc_info=True)
        return jsonify({'msg': 'Internal server error'}), 500
    @app.errorhandler(405)
    def handle_405_error(e):
        return jsonify({'msg': 'Method not allowed'}), 405
    @app.errorhandler(403)
    def handle_403_error(e):
        return jsonify({'msg': 'Forbidden error'}), 403
    @app.errorhandler(404)
    def handle_404_error(e):
        return jsonify({'msg': 'Not Found error'}), 404
    @app.errorhandler(AppErrorBaseClass)
    def handle_app_base_error(e):
        return jsonify({'msg': str(e)}), 500
    @app.errorhandler(ObjectNotFound)
    def handle_object_not_found_error(e):
        return jsonify({'message': str(e)}), 404
    @app.errorhandler(Error400)
    def handle_400_error(e):
        return jsonify({'message': str(e)}), 400
